'use client'

import { signIn } from 'next-auth/react'
import { Suspense, useCallback, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { GitHostingType } from '@/shared/types'
import { useLazyGetUserWithoutSessionQuery } from '@/entities/user/api/userWithoutSessionApi'
import { validateToken } from '@/shared/utils/validateToken'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslations } from 'next-intl'

import { useValidationSchemas } from '@/entities/login/model/useValidationSchemas'

import { LoginSubmitLoader } from './LoginSubmitLoader'
import { GitHostingOption } from './GitHostingOption'
import { ROUTES, LINKS, CONSTANTS } from '@/shared/config'
import { ForgejoIcon, GithubIcon } from '@/shared/ui/icons'
import { LoginForm } from './ui/LoginForm'

export interface FormData {
  token: string
  instanceUrl?: string
  apiEndpoint?: string
}

const protocols = [
  { key: 'https', label: 'https://' },
  { key: 'http', label: 'http://' },
]

const LoginPage = () => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const [gitHosting, setGitHosting] = useState<GitHostingType | null>(null)
  const [protocol, setProtocol] = useState(protocols[0].label)
  const [apiEndpointChange, setApiEndpointChange] = useState(false)
  const [apiEndpoint, setApiEndpoint] = useState('')
  const [serverError, setServerError] = useState<
    | {
        title: string
        status: number
        message: string
      }
    | undefined
  >(undefined)

  console.log(protocol)

  useEffect(() => {
    setApiEndpoint(defaultApiEndpoint())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gitHosting])

  const defaultApiEndpoint = useCallback(() => {
    if (gitHosting === 'forgejo') {
      return CONSTANTS.default.apiEndpoints.forgejo
    }
    return ''
  }, [gitHosting])

  const t = useTranslations('Pages.login')

  const [triggerGetUserWithoutSession] = useLazyGetUserWithoutSessionQuery()

  const { singleTokenSchema, tokenAndUrlSchema } = useValidationSchemas()

  const searchParams = useSearchParams()
  const router = useRouter()

  const [isVisible, setIsVisible] = useState(false)

  const callbackUrl = searchParams.get('callbackUrl') || ROUTES.root

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    setError,
    clearErrors,
    reset,
    getValues,
  } = useForm<FormData>({
    resolver: yupResolver(
      gitHosting !== 'github' ? tokenAndUrlSchema : singleTokenSchema
    ),
    defaultValues: {
      token: '',
      instanceUrl: '',
      apiEndpoint: defaultApiEndpoint(),
    },
  })

  useEffect(() => {
    reset({
      ...getValues(),
      apiEndpoint: defaultApiEndpoint(),
    })
  }, [gitHosting, reset, getValues, defaultApiEndpoint])

  console.log(errors)

  const hasErrors = Boolean(Object.keys(errors).length)

  const handleApiEndpointChange = () => {
    setApiEndpointChange((prev) => !prev)
  }

  const handleProtocolChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setProtocol(event.target.value)
  }

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

    const buildInputInstanceUrl = inputInstanceUrl
      ? `${protocol}${inputInstanceUrl}${apiEndpoint}`
      : undefined

    console.log('buildInputInstanceUrl', buildInputInstanceUrl)

    const instanceUrl =
      gitHosting === 'github' ? LINKS.github.apiUrl : buildInputInstanceUrl

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

      console.log('result', result)

      if (result.error) {
        setServerError(result.error)
        return
      }

      const { name, login, image } = result

      //if ([name, login, image].every((value) => value === undefined)) {
      //  handleError(
      //    'instanceUrl',
      //    'Возможно, URL некорректный или данные недоступны.'
      //  )
      //  return
      //}

      console.log({
        token,
        redirect: false,
        callbackUrl,
        name,
        login,
        image,
        instanceUrl,
      })

      const signInResult = await signIn(provider, {
        token,
        redirect: false,
        callbackUrl,
        name,
        login,
        image,
        instanceUrl,
      })

      console.log(signInResult)

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

  console.log(errors)

  return (
    <div className="mt-12 flex flex-col items-center">
      <div className="w-80 md:w-96">
        {gitHosting === null ? (
          <>
            <h1 key={Date.now()} className="text-3xl font-light">
              {t('form.title')}
            </h1>

            <div className="mt-6 flex flex-col gap-6">
              <GitHostingOption
                buttonText="Github"
                startContent={<GithubIcon size={20} />}
                description={t('form.options.withToken', {
                  gitHosting: 'Github',
                })}
                onPress={() => handleGitHostingChange('github')}
              />
              <GitHostingOption
                buttonText="Forgejo"
                startContent={<ForgejoIcon size={18} />}
                description={t('form.options.withInstanceToken', {
                  gitHosting: 'Forgejo',
                })}
                onPress={() => handleGitHostingChange('forgejo')}
              />
            </div>
          </>
        ) : (
          <LoginForm
            handleSubmit={handleSubmit(onSubmit)}
            gitHosting={gitHosting}
            control={control}
            errors={errors}
            handleApiEndpointChange={handleApiEndpointChange}
            protocols={protocols}
            protocol={protocol}
            apiEndpoint={apiEndpoint}
            apiEndpointChange={apiEndpointChange}
            defaultApiEndpoint={defaultApiEndpoint}
            isSubmitting={isSubmitting}
            hasErrors={hasErrors}
            handleGitHostingChange={handleGitHostingChange}
            handleProtocolChange={handleProtocolChange}
            isVisible={isVisible}
            toggleVisibility={toggleVisibility}
            setApiEndpoint={setApiEndpoint}
            handleClearValue={handleClearValue}
            serverError={serverError}
          />
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
