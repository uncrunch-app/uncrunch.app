import { FC } from 'react'
import { Controller } from 'react-hook-form'
import { Input, InputProps } from '@nextui-org/input'

interface LoginFormControlledInputProps extends InputProps {
  name: string
  control: any
  hideEndContentWhenEmpty?: boolean
  onValueChange?: (value: string) => void
}

export const LoginFormControlledInput: FC<LoginFormControlledInputProps> = ({
  name,
  control,
  endContent,
  hideEndContentWhenEmpty = false,
  onChange,
  onValueChange,
  ...props
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => {
      return (
        <Input
          {...field}
          onChange={(e) => {
            const value = e.target.value
            field.onChange(value)
            if (onChange) onChange(e)
            if (onValueChange) onValueChange(value)
          }}
          autoComplete={name === 'token' ? 'new-password' : 'off'}
          size="lg"
          variant="bordered"
          endContent={
            hideEndContentWhenEmpty ? field.value && endContent : endContent
          }
          className="max-w-full"
          classNames={{
            inputWrapper: 'h-16 group-data-[focus-visible=true]:border-focus',
          }}
          {...props}
        />
      )
    }}
  />
)
