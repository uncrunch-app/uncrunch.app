'use client'

import { signIn, useSession } from 'next-auth/react'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { GitServiceType } from '@/src/6-shared/types'
import { useLazyGetGithubUserDataQuery } from '@/src/5-entities/user'
import { CustomSessionUser } from '@/app/api/auth/authOptions'
import { SignOutButton } from '@/src/6-shared/ui'
import styles from './LoginPage.module.scss'
//import Button from '@/src/6-shared/ui/buttons/Button'
import { useLazyGetForgejoUserDataQuery } from '@/src/5-entities/user/api/forgejoUserApi'
import { validateToken } from '@/src/6-shared/utils/validateToken'
//import CircularProgress from '@mui/material/CircularProgress'
import Input from '@/src/6-shared/ui/textFields/Input'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
//import { SkeletonLoader } from './ui/SkeletonLoader'
import { useTranslations } from 'next-intl'

import { useValidationSchemas } from '@/src/5-entities/login/model/useValidationSchemas'
//import LocaleSwitcher from '@/src/6-shared/LocaleSwitcher'
//import LanguageSwitcher from '@/src/6-shared/ui/LanguageSwitcher'
import { Button } from "@nextui-org/react";
//import ThemeSwitcher from '@/src/6-shared/ui/ThemeSwitcher'

type FormData = {
  token: string
  instanceUrl?: string
}

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [service, setService] = useState<GitServiceType | null>(null)

  const t = useTranslations('Common')

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
        <h1 className={styles.title}> {t('test', { test: 'ЗАГРУЗКА' })} </h1>
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
      <Button color="primary">Кнопка NextUI</Button>
      {/*<ThemeSwitcher />*/}
        {service === null ? (
          <>
            <h1 key={Date.now()} className={styles.title}>
              {t('test', { test: 'ПОЛУЧИЛОСЬ!' })}
            </h1>
            {/*<LocaleSwitcher />*/}
            <div className={styles.buttonContainer}>
              <p className={styles.subtitle}>С помощью токена Github</p>
              <button
                className={styles.button}
                //border="primary"
                onClick={() => {
                  setService('github')
                  console.log('Выбранный сервис: GitHub')
                }}
              >
                GitHub
              </button>
              <p className={styles.subtitle}>
                С помощью токена инстансов Forgejo
              </p>
              <button
                className={styles.button}
                //border="primary"
                onClick={() => {
                  setService('forgejo')
                  console.log('Выбранный сервис: Forgejo')
                }}
              >
                Forgejo
              </button>
            </div>
          </>
        ) : (
          <div>
            <h1 className={styles.title}>
              {t('test', { test: 'ПОЛУЧИЛОСЬ!' })}
            </h1>
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
                      <input
                        //label="URL"
                        {...field}
                        id="instance-url"
                        //errorMessage={errors.instanceUrl?.message}
                        //variant="text"
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
                    <input
                      //label={`${service === 'github' ? 'Github' : 'Forgejo'} токен`}
                      {...field}
                      //variant={'password'}
                      id={'outlined-password'}
                      //inputProps={{ autoComplete: 'new-password' }}
                      //errorMessage={errors.token?.message}
                      onChange={(e) => {
                        field.onChange(e)
                        clearErrors('token')
                      }}
                    />
                  )}
                />
              </div>
              <div className={styles.buttonContainer}>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  //border="primary"
                >
                  {isSubmitting ? (
                    //<CircularProgress color="secondary" size="24.5px" />
                    <span>Loading...</span>
                  ) : (
                    <span>Войти</span>
                  )}
                </button>
                <button
                  color="secondary"
                  //border="primary"
                  disabled={isSubmitting}
                  type="button"
                  onClick={() => setService(null)}
                >
                  Назад
                </button>
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
