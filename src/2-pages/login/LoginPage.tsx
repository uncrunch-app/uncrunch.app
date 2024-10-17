'use client'

import { signIn, useSession } from 'next-auth/react'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { GitHostingType } from '@/src/6-shared/types'
import { useLazyGetGithubUserDataQuery } from '@/src/5-entities/user'
import { useLazyGetForgejoUserDataQuery } from '@/src/5-entities/user/api/forgejoUserApi'
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
import { FORGEJO_EXAMPLE_API_URL } from '@/src/6-shared/constants/constants'
import { InputActionButton } from '@/src/6-shared/ui/buttons/InputActionButton'
import { LoginFormControlledInput } from './LoginFormControlledInput'
import { LoginSubmitLoader } from './LoginSubmitLoader'
import { LoginSkeletonLoader } from './LoginSkeletonLoader'
import { GitHostingOption } from './GitHostingOption'
import { LogOutButton } from '@/src/6-shared/ui'
import { CustomSessionUser } from '@/app/api/auth/authOptions'

interface FormData {
  token: string
  instanceUrl?: string
}

interface LoggedInUserProps {
  username: string;
}

const LoggedInUser: React.FC<LoggedInUserProps> = ({ username }) => {
  return (
    <div>
      <h1>Вы уже авторизованы как @{username}</h1>
      <LogOutButton />
    </div>
  );
};

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [gitHosting, setGitHosting] = useState<GitHostingType | null>(null)

  const t = useTranslations('LoginPage')

  const [triggerGetGithubUserData] = useLazyGetGithubUserDataQuery()
  const [triggerGetForgejoUserData] = useLazyGetForgejoUserDataQuery()

  const { singleTokenSchema, tokenAndUrlSchema } = useValidationSchemas()

  const { data: session, status } = useSession()

  const searchParams = useSearchParams()
  const router = useRouter()

  const [isVisible, setIsVisible] = useState(false)

  const callbackUrl = searchParams.get('callbackUrl') || '/'

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

  const onSubmit = async (data: FormData) => {
    const { token, instanceUrl } = data

    console.info('Form submitted:', data)

    try {
      let name = null
      let login = null
      let image = null

      if (gitHosting === 'github') {
        const result = await validateToken({
          token,
          trigger: triggerGetGithubUserData,
        })
        if (result.error) {
          setError('token', { message: result.error })
          return
        }
        name = result.name
        login = result.login
        image = result.image
      }

      if (gitHosting === 'forgejo') {
        const result = await validateToken({
          token,
          baseUrl: instanceUrl,
          trigger: triggerGetForgejoUserData,
        })
        console.log(result)

        if (result.error) {
          setError('token', { message: result.error })
          return
        }
        name = result.name
        login = result.login
        image = result.image
      }

      // Проверка на undefined для name, login и image
      if (name === undefined && login === undefined && image === undefined) {
        setError('instanceUrl', {
          message: 'Возможно, URL некорректный или данные недоступны.',
        })
        return
      }

      const provider =
        gitHosting === 'github' ? 'github-token' : 'forgejo-token'
      const result = await signIn(provider, {
        token,
        redirect: false,
        callbackUrl,
        name,
        login,
        image,
        instanceUrl,
      })

      setIsLoading(true)

      if (result?.error) {
        setError('token', {
          message: result.error || 'Invalid token or login failed',
        })
      } else {
        router.push(callbackUrl)
      }
    } catch (error) {
      console.error('Ошибка при входе в систему:', error)
      setError('token', {
        message: 'Ошибка при проверке токена или входе в систему',
      })
    }
  }

  useEffect(() => {
    clearErrors()
  }, [gitHosting, clearErrors])

  useEffect(() => {
    handleClearValue('token')
  }, [gitHosting, setValue])

  //if (status !== 'loading') {
  //  return <LoginSkeletonLoader />
  //}

  if (isLoading) {
    return <LoginSubmitLoader />
  }

  if (status === 'authenticated' && session?.user) {
    const user = session.user as CustomSessionUser

    return <LoggedInUser username={user.login}/>
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
                    placeholder={FORGEJO_EXAMPLE_API_URL}
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

export default LoginPageWithSuspense
