'use client'

import { signIn, useSession } from 'next-auth/react'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { GitHostingType } from '@/src/6-shared/types'
import { useLazyGetGithubUserDataQuery } from '@/src/5-entities/user'
import { CustomSessionUser } from '@/app/api/auth/authOptions'
import { LogOutButton } from '@/src/6-shared/ui'
import styles from './LoginPage.module.scss'
import { useLazyGetForgejoUserDataQuery } from '@/src/5-entities/user/api/forgejoUserApi'
import { validateToken } from '@/src/6-shared/utils/validateToken'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslations } from 'next-intl'

import { useValidationSchemas } from '@/src/5-entities/login/model/useValidationSchemas'
import { Button } from '@nextui-org/react'

import { Input } from '@nextui-org/react'

import { HiMiniXMark, HiMiniEyeSlash, HiMiniEye } from 'react-icons/hi2'

type FormData = {
  token: string
  instanceUrl?: string
}

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

  const toggleVisibility = () => setIsVisible(!isVisible)

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
      gitHosting === 'forgejo' ? tokenAndUrlSchema : singleTokenSchema
    ),
  })

  useEffect(() => {
    clearErrors()
  }, [gitHosting, clearErrors])

  const onSubmit = async (data: FormData) => {
    const { token, instanceUrl } = data
    console.log('Form submitted:', data)
    console.log('Service:', gitHosting)
    console.log('Token:', data.token)
    console.log('Instance URL:', data.instanceUrl)

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

      const provider = gitHosting === 'github' ? 'github-token' : 'forgejo-token'
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

  if (status === 'loading') {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}> {t('title')} </h1>
        {/*<SkeletonLoader />*/}
        <span>Loading...</span>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className={styles.spinnerContainer}>{/*<CircularProgress />*/}</div>
    )
  }

  if (status === 'authenticated' && session?.user) {
    const user = session.user as CustomSessionUser

    console.log(typeof user.name)

    return (
      <div>
        <h1>Вы уже авторизованы как @{user.login}</h1>
        <LogOutButton />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.skeletonContainer}>
        {gitHosting === null ? (
          <>
            <h1 key={Date.now()} className={styles.title}>
              {t('title')}
            </h1>
            <div className={styles.buttonContainer}>
              <p className={styles.subtitle}>
                {t('withToken', { gitHosting: 'Github' })}
              </p>
              <Button
                 className='h-12 rounded-large uppercase'
                onClick={() => {
                  setGitHosting('github')
                  console.log('Выбранный сервис: GitHub')
                }}
              >
                GitHub
              </Button>
              <p className={styles.subtitle}>
                {t('withInstanceToken', { gitHosting: 'Forgejo' })}
              </p>
              <Button
                 className='h-12 rounded-large uppercase'
                //border="primary"
                onClick={() => {
                  setGitHosting('forgejo')
                  console.log('Выбранный сервис: Forgejo')
                }}
              >
                Forgejo
              </Button>
            </div>
          </>
        ) : (
          <div>
            <h1 className={styles.title}>{t('title')}</h1>
            <form
              autoComplete="new-password"
              className={styles.form}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className={styles.inputContainer}>
                {gitHosting === 'forgejo' && (
                  <Controller
                    name="instanceUrl"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      
                      <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        clearErrors('instanceUrl')
                      }}
                      autoComplete='new-password'
                      size="lg"
                      description={gitHosting === 'forgejo' ? 'Forgejo instance' : null}
                      isInvalid={!!errors.instanceUrl?.message}
                      errorMessage={errors.instanceUrl?.message}
                      variant="bordered"
                      placeholder={`${gitHosting === 'forgejo' ? 'https://codeberg.org/api/v1/' : 'null'}`}
                      endContent={
                        field.value && (
                          <div className="flex items-center">
                            <Button
                              className="text-default-background min-w-0 rounded-full px-2"
                              variant="light"
                              onClick={() => setValue('instanceUrl', '')}
                              onPress={() => setValue('instanceUrl', '')}
                              type="button"
                            >
                              <HiMiniXMark size={24} />
                            </Button>
                          </div>
                        )
                      }
                      type={'text'}
                      className="max-w-full"
                      classNames={{inputWrapper: 'h-16'}}
                    />
                    )}
                  />
                )}
                <Controller
                  name="token"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        clearErrors('token')
                      }}
                      autoComplete='new-password'
                      size="lg"
                      description="cccc"
                      isInvalid={!!errors.token?.message}
                      errorMessage={errors.token?.message}
                      variant="bordered"
                      placeholder={`${gitHosting === 'github' ? 'Github' : 'Forgejo'} токен`}
                      endContent={
                        field.value && (
                          <div className="flex items-center">
                            <Button
                              className="text-default-background min-w-0 rounded-full px-2"
                              variant="light"
                              onClick={() => setValue('token', '')}
                              onPress={() => setValue('token', '')}
                              type="button"
                            >
                              <HiMiniXMark size={24} />
                            </Button>
                            <Button
                              className="text-default-background min-w-0 rounded-full px-2"
                              variant="light"
                              type="button"
                              onClick={toggleVisibility}
                              aria-label="toggle password visibility"
                              tabIndex={0}
                              onPress={toggleVisibility}
                            >
                              {isVisible ? (
                                <HiMiniEyeSlash  size={24} />
                              ) : (
                                <HiMiniEye  size={24} />
                              )}
                            </Button>
                          </div>
                        )
                      }
                      type={isVisible ? 'text' : 'password'}
                      className="max-w-full"
                      classNames={{inputWrapper: 'h-16'}}
                    />
                  )}
                />
              </div>
              <div className={styles.buttonContainer}>
                <Button type="submit" color="default" isLoading={isSubmitting} className='h-12 rounded-large'>
                  {t('logInButton')}
                </Button>
                <Button
                  color="secondary"
                  isDisabled={isSubmitting}
                   className='h-12 rounded-large'
                  type="button"
                  onClick={() => setGitHosting(null)}
                >
                  {t('backButton')}
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
