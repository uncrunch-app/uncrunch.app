'use client'

import { signIn, useSession } from 'next-auth/react'
import { FormEvent, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { GitServiceType } from '@/src/6-shared/types'
import { useLazyGetGithubUserDataQuery } from '@/src/5-entities/user'
import { CustomSessionUser } from '../../../app/api/auth/[...nextauth]/route'
import { SignOutButton } from '@/src/6-shared/ui'
import styles from './LoginPage.module.scss'
import Skeleton from '@mui/material/Skeleton'
import Button from '@/src/6-shared/ui/buttons/Button'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'
import * as COLOR from '@/src/6-shared/constants/colors'
import { useLazyGetForgejoUserDataQuery } from '@/src/5-entities/user/api/forgejoUserApi'
import { validateToken } from '@/src/6-shared/utils/validateToken'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const LoginPage = () => {
  const [token, setToken] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [instanceUrl, setInstanceUrl] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [service, setService] = useState<GitServiceType | null>(null)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const router = useRouter()
  const [triggerGetGithubUserData] = useLazyGetGithubUserDataQuery()
  const [triggerGetForgejoUserData] = useLazyGetForgejoUserDataQuery()

  const { data: session, status } = useSession()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  useEffect(() => {
    if (!token) {
      setError('')
    }
  }, [token])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    let name = null
    let login = null
    let image = null

    try {
      if (service === 'github') {
        const result = await validateToken({
          token,
          trigger: triggerGetGithubUserData,
        })
        if (result.error) {
          setError(result.error)
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
        if (result.error) {
          setError(result.error)
          return
        }
        name = result.name
        login = result.login
        image = result.image
      }

      // Авторизация через соответствующего провайдера
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
        setError(result.error || 'Invalid token or login failed')
      } else {
        router.push(callbackUrl)
      }
    } catch (error) {
      setError('Error validating token or signing in')
    }
  }

  if (status === 'loading') {
    return (
      <div className={styles.container}>
        <div className={styles.skeletonContainer}>
          <Skeleton
            width={80}
            variant="rounded"
            height={48}
            animation="wave"
            sx={{ backgroundColor: COLOR.GREEN_10 }}
          />

          <div className={styles.buttonContainer}>
            <Skeleton
              width="100%"
              height={24}
              animation="wave"
              sx={{ backgroundColor: COLOR.GREEN_10 }}
            />
            <Skeleton
              width="100%"
              height={44}
              variant="rounded"
              animation="wave"
              sx={{
                borderRadius: '16px',
                backgroundColor: COLOR.GREEN_10,
              }}
            />
            <Skeleton
              width="100%"
              height={48}
              animation="wave"
              sx={{ backgroundColor: COLOR.GREEN_10 }}
            />
            <Skeleton
              width="100%"
              height={44}
              variant="rounded"
              animation="wave"
              sx={{
                borderRadius: '16px',
                backgroundColor: COLOR.GREEN_10,
              }}
            />
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      //<div className={styles.container}>
      <div className={styles.spinnerContainer}>
        <CircularProgress />
      </div>
      //</div>
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
            <h1 className={styles.title}>Вход</h1>

            <div className={styles.buttonContainer}>
              <p className={styles.subtitle}>С помощью токена Github</p>
              <Button
                className={styles.button}
                border="primary"
                onClick={() => setService('github')}
              >
                GitHub
              </Button>
              <p className={styles.subtitle}>
                С помощью токена инстансов Forgejo (codeberg.org,
                git.disroot.org и пр.)
              </p>
              <Button
                className={styles.button}
                border="primary"
                onClick={() => setService('forgejo')}
              >
                Forgejo
              </Button>
            </div>
          </>
        ) : (
          <div>
            <h1 className={styles.title}>Вход</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputContainer}>
                {service === 'forgejo' && (
                  <FormControl
                    sx={{
                      width: '100%',
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: COLOR.GREEN,
                          borderRadius: '18px',
                        },
                        '&:hover fieldset': {
                          borderColor: COLOR.GREEN_50,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: COLOR.GREEN,
                          borderRadius: '18px',
                        },
                      },
                    }}
                    variant="outlined"
                  >
                    <InputLabel
                      htmlFor="instance-url"
                      sx={{ color: COLOR.GREEN }}
                    >
                      URL
                    </InputLabel>
                    <OutlinedInput
                      id="instance-url"
                      type="text"
                      value={instanceUrl}
                      onChange={(e) => setInstanceUrl(e.target.value)}
                      label={'URL'}
                      sx={{
                        color: COLOR.GREEN,
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'red',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderWidth: '2px',
                        },
                      }}
                    />
                    <FormHelperText
                      sx={{
                        color: 'red',
                      }}
                      id="component-error-text"
                    >
                      {error}
                    </FormHelperText>
                  </FormControl>
                )}
                <FormControl
                  sx={{
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: COLOR.GREEN,
                        borderRadius: '18px',
                      },
                      '&:hover fieldset': {
                        borderColor: COLOR.GREEN_50,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: COLOR.GREEN,
                        borderRadius: '18px',
                      },
                    },
                  }}
                  variant="outlined"
                >
                  <InputLabel
                    htmlFor="outlined-adornment-password"
                    sx={{ color: COLOR.GREEN }}
                  >
                    {`${service === 'github' ? 'Github' : 'Forgejo'} токен`}
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          edge="end"
                          sx={{
                            color: showPassword ? COLOR.RED : COLOR.GREEN,
                          }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label={`${service === 'github' ? 'GitHub' : 'Forgejo'} token`}
                    sx={{
                      color: COLOR.GREEN,
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'red',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderWidth: '2px',
                      },
                    }}
                    inputProps={{
                      form: {
                        autoComplete: 'off',
                      },
                    }}
                  />

                  <FormHelperText
                    sx={{
                      color: 'red',
                    }}
                    id="component-error-text"
                  >
                    {error}
                  </FormHelperText>
                </FormControl>
              </div>

              <div className={styles.buttonContainer}>
                <Button type="submit" border="primary">
                  Войти
                </Button>
                <Button
                  color="secondary"
                  border="primary"
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

export default LoginPage
