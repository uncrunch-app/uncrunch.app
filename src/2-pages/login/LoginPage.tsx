'use client'

import { signIn } from 'next-auth/react'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { GitHostingType } from '@/src/6-shared/types'
import { useLazyGetUserWithoutSessionQuery } from '@/src/5-entities/user/api/userWithoutSessionApi'
import { validateToken } from '@/src/6-shared/utils/validateToken'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslations } from 'next-intl'

import { useValidationSchemas } from '@/src/5-entities/login/model/useValidationSchemas'

import {
  HiMiniXMark as XMark,
  HiMiniEyeSlash as EyeSlash,
  HiMiniEye as Eye,
} from 'react-icons/hi2'
import { Button } from '@/src/6-shared/ui/buttons/Button'
import { InputActionButton } from '@/src/6-shared/ui/buttons/InputActionButton'
import { LoginFormControlledInput } from './LoginFormControlledInput'
import { LoginSubmitLoader } from './LoginSubmitLoader'
import { GitHostingOption } from './GitHostingOption'
import { routes } from '@/src/6-shared/services/routes'
import { links } from '@/src/6-shared/services/links'

interface FormData {
  token: string
  instanceUrl?: string
}

const LoginPage = () => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const [gitHosting, setGitHosting] = useState<GitHostingType | null>(null)

  const t = useTranslations('Pages.login')

  const [triggerGetUserWithoutSession] = useLazyGetUserWithoutSessionQuery()

  const { singleTokenSchema, tokenAndUrlSchema } = useValidationSchemas()

  const searchParams = useSearchParams()
  const router = useRouter()

  const [isVisible, setIsVisible] = useState(false)

  const callbackUrl = searchParams.get('callbackUrl') || routes.root

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    setError,
    clearErrors,
  } = useForm<FormData>({
    resolver: yupResolver(
      gitHosting !== 'github' ? tokenAndUrlSchema : singleTokenSchema
    ),
  })

  const hasErrors = Boolean(Object.keys(errors).length)

  const handleGitHostingChange = (gitHosting: GitHostingType | null) => {
    setGitHosting(gitHosting)
  }

  const handleClearValue = (name: keyof FormData) => {
    setValue(name, '')
  }

  const toggleVisibility = () => setIsVisible(!isVisible)

  const providerMap: { [key in GitHostingType]: string } = {
    github: 'github-token',
    forgejo: 'forgejo-token',
    // bitbucket: 'bitbucket-token',
    // gitlab: 'gitlab-token',
  }

  const handleError = (field: keyof FormData, message: string) => {
    setError(field, { message })
  }

  const onSubmit = async (data: FormData) => {
    const { token, instanceUrl: inputInstanceUrl } = data

    const instanceUrl =
      gitHosting === 'github' ? links.github.api_url : inputInstanceUrl

    if (!gitHosting) {
      console.error('Git хостинг не выбран.')
      return
    }

    const provider = providerMap[gitHosting]

    try {
      const result = await validateToken({
        token,
        baseUrl: instanceUrl!,
        trigger: triggerGetUserWithoutSession,
      })

      if (result.error) {
        handleError('token', result.error)
        return
      }

      const { name, login, image } = result

      if ([name, login, image].every((value) => value === undefined)) {
        handleError(
          'instanceUrl',
          'Возможно, URL некорректный или данные недоступны.'
        )
        return
      }

      const signInResult = await signIn(provider, {
        token,
        redirect: false,
        callbackUrl,
        name,
        login,
        image,
        instanceUrl,
      })

      setIsSubmitLoading(true)

      if (signInResult?.error) {
        handleError(
          'token',
          signInResult.error || 'Invalid token or login failed'
        )
        return
      }

      router.push(callbackUrl)
    } catch (error) {
      console.error('Ошибка при входе в систему:', error)
      handleError('token', 'Ошибка при проверке токена или входе в систему')
    }
  }

  useEffect(() => {
    clearErrors()
  }, [gitHosting, clearErrors])

  useEffect(() => {
    setValue('token', '')
  }, [gitHosting, setValue])

  if (isSubmitLoading) {
    return <LoginSubmitLoader />
  }

  return (
    <div className="mt-12 flex flex-col items-center">
      <div className="w-96">
        {gitHosting === null ? (
          <>
            <h1 key={Date.now()} className="text-3xl font-light">
              {t('form.title')}
            </h1>

            <div className="mt-6 flex flex-col gap-6">
              <GitHostingOption
                buttonText="Github"
                description={t('form.options.withToken', {
                  gitHosting: 'Github',
                })}
                onClick={() => handleGitHostingChange('github')}
              />
              <GitHostingOption
                buttonText="Forgejo"
                description={t('form.options.withInstanceToken', {
                  gitHosting: 'Forgejo',
                })}
                onClick={() => handleGitHostingChange('forgejo')}
              />
            </div>
          </>
        ) : (
          <div>
            <h1 className="text-3xl font-light">{t('form.title')}</h1>
            <form
              autoComplete="off"
              className=""
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="">
                {gitHosting === 'forgejo' && (
                  <LoginFormControlledInput
                    name="instanceUrl"
                    control={control}
                    placeholder={links.forgejo.example_api_url}
                    isInvalid={Boolean(errors.instanceUrl?.message)}
                    errorMessage={errors.instanceUrl?.message}
                    onClear={() => handleClearValue('instanceUrl')}
                    description={t('form.descriptions.instanceUrlInput', {
                      gitHosting: 'Forgejo',
                    })}
                    endContent={
                      <div className="flex items-center">
                        <InputActionButton
                          onClick={() => handleClearValue('instanceUrl')}
                          hasError={hasErrors}
                          aria-label="clear input instance url"
                        >
                          <XMark size={24} />
                        </InputActionButton>
                      </div>
                    }
                  />
                )}
                <LoginFormControlledInput
                  name="token"
                  control={control}
                  placeholder={`${gitHosting === 'github' ? 'Github' : 'Forgejo'} токен`}
                  isInvalid={Boolean(errors.token?.message)}
                  errorMessage={errors.token?.message}
                  onClear={() => handleClearValue('token')}
                  type={isVisible ? 'text' : 'password'}
                  endContent={
                    <div className="flex items-center">
                      <InputActionButton
                        onClick={() => handleClearValue('token')}
                        hasError={hasErrors}
                        aria-label="clear input token"
                      >
                        <XMark size={24} />
                      </InputActionButton>
                      <InputActionButton
                        onClick={toggleVisibility}
                        hasError={hasErrors}
                        aria-label="toggle password visibility"
                      >
                        {isVisible ? <EyeSlash size={24} /> : <Eye size={24} />}
                      </InputActionButton>
                    </div>
                  }
                />
              </div>
              <div className="flex flex-col gap-4">
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  isDisabled={Boolean(hasErrors)}
                >
                  {t('form.buttons.logIn')}
                </Button>
                <Button
                  color="secondary"
                  isDisabled={isSubmitting}
                  onClick={() => handleGitHostingChange(null)}
                >
                  {t('form.buttons.back')}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

const LoginPageWithSuspense = () => (
  <Suspense fallback={<div>Заменить на скелетон</div>}>
    <LoginPage />
  </Suspense>
)

export default LoginPage
