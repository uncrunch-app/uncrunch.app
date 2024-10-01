'use client'

import { signIn, useSession } from 'next-auth/react'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { GitServiceType } from '@/src/6-shared/types'
import { useLazyGetGithubUserDataQuery } from '@/src/5-entities/user'
import { CustomSessionUser } from '@/app/api/auth/authOptions'
import { SignOutButton } from '@/src/6-shared/ui'
import styles from './LoginPage.module.scss'
import Button from '@/src/6-shared/ui/buttons/Button'
import { useLazyGetForgejoUserDataQuery } from '@/src/5-entities/user/api/forgejoUserApi'
import { validateToken } from '@/src/6-shared/utils/validateToken'
import CircularProgress from '@mui/material/CircularProgress'
import Input from '@/src/6-shared/ui/textFields/Input'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SkeletonLoader } from './ui/SkeletonLoader'
import { useTranslation } from 'react-i18next'

import Cookies from 'js-cookie'
import { useValidationSchemas } from '@/src/5-entities/login/model/useValidationSchemas'
import i18n from '@/i18n'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    Cookies.set('i18next', lng) // Сохраняем язык в cookie
  }

  // Устанавливаем язык при монтировании компонента
  useEffect(() => {
    const savedLanguage = Cookies.get('i18next')
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage)
    }
  }, [i18n])

  return (
    <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('ru')}>Русский</button>
    </div>
  )
}

type FormData = {
  token: string
  instanceUrl?: string
}

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [service, setService] = useState<GitServiceType | null>(null)

  const { t } = useTranslation('common')

  const [triggerGetGithubUserData] = useLazyGetGithubUserDataQuery()
  const [triggerGetForgejoUserData] = useLazyGetForgejoUserDataQuery()

  const { singleTokenSchema, tokenAndUrlSchema } = useValidationSchemas()

  const { data: session, status } = useSession()

  const searchParams = useSearchParams()
  const router = useRouter()

  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<FormData>({
    resolver: yupResolver(
      service === 'forgejo' ? tokenAndUrlSchema : singleTokenSchema
    ),
  })

  useEffect(() => {
    clearErrors()
  }, [service, clearErrors])

  const onSubmit = async (data: FormData) => {
    const { token, instanceUrl } = data
    console.log('Form submitted:', data)
    console.log('Service:', service)
    console.log('Token:', data.token)
    console.log('Instance URL:', data.instanceUrl)

    try {
      let name = null
      let login = null
      let image = null

      if (service === 'github') {
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

      if (service === 'forgejo') {
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

      const provider = service === 'github' ? 'github-token' : 'forgejo-token'
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
        <h1 className={styles.title}>{t('test', { test: 'EEE' })}</h1>
        <SkeletonLoader />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className={styles.spinnerContainer}>
        <CircularProgress />
      </div>
    )
  }

  if (status === 'authenticated' && session?.user) {
    const user = session.user as CustomSessionUser
    return (
      <div>
        <h1>Вы уже авторизованы как {user.name || user.login}</h1>
        <SignOutButton />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.skeletonContainer}>
        {service === null ? (
          <>
            <h1 key={i18n.language} className={styles.title}>
              {t('test', { test: 'HHH' })}
            </h1>
            <LanguageSwitcher />
            <div className={styles.buttonContainer}>
              <p className={styles.subtitle}>С помощью токена Github</p>
              <Button
                className={styles.button}
                border="primary"
                onClick={() => {
                  setService('github')
                  console.log('Выбранный сервис: GitHub')
                }}
              >
                GitHub
              </Button>
              <p className={styles.subtitle}>
                С помощью токена инстансов Forgejo
              </p>
              <Button
                className={styles.button}
                border="primary"
                onClick={() => {
                  setService('forgejo')
                  console.log('Выбранный сервис: Forgejo')
                }}
              >
                Forgejo
              </Button>
            </div>
          </>
        ) : (
          <div>
            <h1 className={styles.title}>{t('test', { test: 'GGG' })}</h1>
            <form
              autoComplete="off"
              className={styles.form}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className={styles.inputContainer}>
                {service === 'forgejo' && (
                  <Controller
                    name="instanceUrl"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        label="URL"
                        {...field}
                        id="instance-url"
                        errorMessage={errors.instanceUrl?.message}
                        variant="text"
                        value={field.value || ''}
                        onChange={(e) => {
                          field.onChange(e)
                          clearErrors('instanceUrl')
                        }}
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
                      label={`${service === 'github' ? 'Github' : 'Forgejo'} токен`}
                      {...field}
                      variant={'password'}
                      id={'outlined-password'}
                      inputProps={{ autoComplete: 'new-password' }}
                      errorMessage={errors.token?.message}
                      onChange={(e) => {
                        field.onChange(e)
                        clearErrors('token')
                      }}
                    />
                  )}
                />
              </div>
              <div className={styles.buttonContainer}>
                <Button disabled={isSubmitting} type="submit" border="primary">
                  {isSubmitting ? (
                    <CircularProgress color="secondary" size="24.5px" />
                  ) : (
                    <span>Войти</span>
                  )}
                </Button>
                <Button
                  color="secondary"
                  border="primary"
                  disabled={isSubmitting}
                  type="button"
                  onClick={() => setService(null)}
                >
                  Назад
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
