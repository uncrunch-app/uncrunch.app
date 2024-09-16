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

const LoginPage = () => {
  const [token, setToken] = useState('')
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
      <>
        <div className={styles.skeletonContainer}>
          <Skeleton width={220} height={24} animation="wave" />
          <div className={styles.buttonContainer}>
            <Skeleton
              width={134}
              height={44}
              variant="rounded"
              animation="wave"
              sx={{
                borderRadius: '16px',
              }}
            />
            <Skeleton
              width={206}
              height={44}
              variant="rounded"
              animation="wave"
              sx={{
                borderRadius: '16px',
              }}
            />
          </div>
        </div>
      </>
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
    <div className={styles.skeletonContainer}>
      {service === null ? (
        <>
          <p>Авторизоваться с помощью</p>
          <div className={styles.buttonContainer}>
            <Button border onClick={() => setService('github')}>
              Токена GitHub
            </Button>
            <Button border onClick={() => setService('forgejo')}>
              Токена Forgejo инстанса
            </Button>
          </div>
        </>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <FormControl
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'red',
                    borderRadius: '18px', // Радиус бордера вне фокуса
                  },
                  '&:hover fieldset': {
                    borderColor: 'darkgray',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'blue',
                    borderRadius: '18px', // Радиус бордера при фокусе
                  },
                },
              }}
              variant="outlined"
            >
              <InputLabel
                htmlFor="outlined-adornment-password"
                sx={{ color: 'green' }}
              >
                {`${service === 'github' ? 'GitHub' : 'Forgejo'} token`}
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
                        color: showPassword ? 'red' : 'green', // Цвет иконки (можно использовать условия)
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label={`${service === 'github' ? 'GitHub' : 'Forgejo'} token`} // Проп label помогает расчёту обводки
                sx={{
                  color: 'green',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'darkgray', // Цвет бордера при наведении мыши
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'blue', // Цвет бордера при фокусе
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

            <div className={styles.buttonContainer}>
              <Button type="submit" border>
                Sign In
              </Button>
              <Button
                color="secondary"
                border
                type="button"
                onClick={() => setService(null)}
              >
                Back
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default LoginPage
