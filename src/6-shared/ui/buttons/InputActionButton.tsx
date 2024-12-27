import { ReactNode, FC } from 'react'
import { Button, ButtonProps } from '@nextui-org/react'

interface InputActionButtonProps extends ButtonProps {
  children: ReactNode
  hasError: boolean
}

export const InputActionButton: FC<InputActionButtonProps> = ({
  children,
  hasError,
  ...props
}) => {
  return (
    <Button
      className="min-w-0 px-2"
      color={hasError ? 'danger' : 'primary'}
      variant="light"
      radius="full"
      type="button"
      {...props}
    >
      {children}
    </Button>
  )
}
