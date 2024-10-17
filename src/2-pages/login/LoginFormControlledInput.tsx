import { FC, ReactNode } from "react"
import { Controller } from "react-hook-form"
import { Input } from '@nextui-org/react'

interface LoginFormControlledInputProps {
  name: string
  control: any
  defaultValue?: string
  placeholder: string
  isInvalid?: boolean
  errorMessage?: string
  onClear: () => void
  endContent?: ReactNode
  type?: string
  description?: string
  onChange?: (e: any) => void
}

export const LoginFormControlledInput: FC<LoginFormControlledInputProps> = ({
  name,
  control,
  defaultValue = '',
  placeholder,
  isInvalid,
  errorMessage,
  endContent,
  type = 'text',
  description,
  onChange,
}) => (
  <Controller
    name={name}
    control={control}
    defaultValue={defaultValue}
    render={({ field }) => (
      <Input
        {...field}
        onChange={(e) => {
          field.onChange(e)
          if (onChange) {
            onChange(e)
          }
        }}
        autoComplete={name === 'token' ? 'new-password' : 'off'}
        size="lg"
        description={description}
        isInvalid={isInvalid}
        errorMessage={errorMessage}
        variant="bordered"
        placeholder={placeholder}
        endContent={field.value && endContent}
        type={type}
        className="max-w-full"
        classNames={{ inputWrapper: 'h-16' }}
      />
    )}
  />
)