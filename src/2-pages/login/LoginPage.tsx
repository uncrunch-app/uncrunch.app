'use client'

import { signIn, useSession } from 'next-auth/react'
import { FormEvent, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { GitServiceType } from '@/src/6-shared/types'
import { useLazyGetUserDataQuery } from '@/src/5-entities/user'
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
import {
  COLOR_GREEN,
  COLOR_GREEN_10,
  COLOR_GREEN_50,
} from '@/src/6-shared/constants/colors'

const LoginPage = () => {
  const [token, setToken] = useState('')
  const [instanceUrl, setInstanceUrl] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [service, setService] = useState<GitServiceType | null>(null)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const router = useRouter()
  const [triggerGetUserData] = useLazyGetUserDataQuery()

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

    if (service === 'github') {
      const { data, error: githubError } = await triggerGetUserData({ token })

      if (githubError) {
        setError((githubError as any).data?.message || 'Invalid GitHub token')
        return
      }

      name = data?.name || null
      login = data?.login || null
      image = data?.avatar_url || null
    }

    const provider = service === 'github' ? 'github-token' : 'forgejo-token'
    const result = await signIn(provider, {
      token,
      redirect: false,
      callbackUrl,
      name,
      login,
      image,
    })

    if (result?.error) {
      setError(result.error || 'Invalid token or login failed')
    } else {
      router.push(callbackUrl)
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
            sx={{ backgroundColor: COLOR_GREEN_10 }}
          />

          <div className={styles.buttonContainer}>
            <Skeleton
              width="100%"
              height={24}
              animation="wave"
              sx={{ backgroundColor: COLOR_GREEN_10 }}
            />
            <Skeleton
              width="100%"
              height={44}
              variant="rounded"
              animation="wave"
              sx={{
                borderRadius: '16px',
                backgroundColor: COLOR_GREEN_10,
              }}
            />
            <Skeleton
              width="100%"
              height={48}
              animation="wave"
              sx={{ backgroundColor: COLOR_GREEN_10 }}
            />
            <Skeleton
              width="100%"
              height={44}
              variant="rounded"
              animation="wave"
              sx={{
                borderRadius: '16px',
                backgroundColor: COLOR_GREEN_10,
              }}
            />
          </div>
        </div>
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

  // Если пользователь не авторизован, рендерим форму авторизации
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
                          borderColor: COLOR_GREEN,
                          borderRadius: '18px', // Радиус бордера вне фокуса
                        },
                        '&:hover fieldset': {
                          borderColor: COLOR_GREEN_50,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: COLOR_GREEN,
                          borderRadius: '18px', // Радиус бордера при фокусе
                        },
                      },
                    }}
                    variant="outlined"
                  >
                    <InputLabel
                      htmlFor="instance-url"
                      sx={{ color: COLOR_GREEN }}
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
                        color: COLOR_GREEN,
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'red',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderWidth: '2px', // Толщина бордера при фокусе
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
                        borderColor: COLOR_GREEN,
                        borderRadius: '18px', // Радиус бордера вне фокуса
                      },
                      '&:hover fieldset': {
                        borderColor: COLOR_GREEN_50,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: COLOR_GREEN,
                        borderRadius: '18px', // Радиус бордера при фокусе
                      },
                    },
                  }}
                  variant="outlined"
                >
                  <InputLabel
                    htmlFor="outlined-adornment-password"
                    sx={{ color: COLOR_GREEN }}
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
                            color: showPassword ? 'red' : COLOR_GREEN, // Цвет иконки (можно использовать условия)
                          }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label={`${service === 'github' ? 'GitHub' : 'Forgejo'} token`}
                    sx={{
                      color: COLOR_GREEN,
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'red',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderWidth: '2px', // Толщина бордера при фокусе
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
