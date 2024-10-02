import {
  ChangeEvent, useState,
  MouseEvent,
  forwardRef
} from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'
import * as COLOR from '@/src/6-shared/constants/colors'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'
import ClearIcon from '@mui/icons-material/Clear'

type InputVariant = 'text' | 'password'

interface InputProps extends Omit<OutlinedInputProps, 'label'> {
  label: string
  value: string
  variant: InputVariant
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  errorMessage?: string
  id: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, value, onChange, errorMessage, id, variant, ...props },
  ref
) {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleClearInput = () => {
    onChange({ target: { value: '' } } as ChangeEvent<HTMLInputElement>)
  }

  const getInputType = (
    variant: InputVariant,
    showPassword: boolean
  ): InputVariant => {
    return variant === 'password'
      ? showPassword
        ? 'text'
        : 'password'
      : 'text'
  }

  return (
    <FormControl
      sx={{
        width: '100%',
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: COLOR.GREEN,
            borderRadius: '20px',
          },
          '&:hover fieldset': {
            borderColor: COLOR.GREEN_50,
          },
          '&.Mui-focused fieldset': {
            borderColor: COLOR.GREEN,
            borderRadius: '20px',
          },
        },
      }}
      variant="outlined"
    >
      <InputLabel htmlFor={id} sx={{ color: COLOR.GREEN }}>
        {label}
      </InputLabel>
      <OutlinedInput
        sx={{ padding: '0 18px 0 0' }}
        id={id}
        type={getInputType(variant, showPassword)}
        value={value}
        onChange={onChange}
        label={label}
        inputRef={ref}
        endAdornment={
          <InputAdornment position="end">
            <div style={{ display: 'flex', gap: '11px' }}>
              {value && (
                <IconButton
                  aria-label="clear input"
                  onClick={handleClearInput}
                  edge="end"
                  sx={{ color: COLOR.GREEN }}
                >
                  <ClearIcon />
                </IconButton>
              )}
              {variant === 'password' && (
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  sx={{ color: showPassword ? COLOR.RED : COLOR.GREEN }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              )}
            </div>
          </InputAdornment>
        }
        {...props}
      />
      <FormHelperText sx={{ color: COLOR.RED }} id="error-text">
        {errorMessage}
      </FormHelperText>
    </FormControl>
  )
})

export default Input
