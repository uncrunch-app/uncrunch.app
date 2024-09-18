import { ChangeEvent, FC, useState, MouseEvent } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'
import * as COLOR from '@/src/6-shared/constants/colors'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'

type InputVariant = 'text' | 'password'

interface InputProps {
  label: string
  value: string
  variant: InputVariant
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  errorMessage?: string
  id: string
  autoComplete?: boolean
}

const Input: FC<InputProps> = ({
  label,
  value,
  onChange,
  errorMessage,
  id,
  variant,
  autoComplete = true,
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleMouseUpPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const getInputType = (
    variant: InputVariant,
    showPassword: boolean
  ): InputVariant => {
    if (variant === 'password') {
      return showPassword ? 'text' : 'password'
    }

    return 'text'
  }

  return (
    <>
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
        <InputLabel htmlFor={id} sx={{ color: COLOR.GREEN }}>
          {label}
        </InputLabel>
        <OutlinedInput
          id={id}
          type={getInputType(variant, showPassword)}
          value={value}
          onChange={onChange}
          label={label}
          inputProps={
            autoComplete
              ? undefined
              : {
                  form: {
                    autoComplete: 'off',
                  },
                }
          }
          endAdornment={
            variant === 'password' && (
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
            )
          }
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
          id="error-text"
        >
          {errorMessage}
        </FormHelperText>
      </FormControl>
    </>
  )
}

export default Input
