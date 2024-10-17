import { ReactNode, FC } from 'react'
import { Button } from '@nextui-org/react'

interface InputActionButtonProps {
  onClick: () => void
  children: ReactNode
  hasError: boolean
}

export const InputActionButton: FC<InputActionButtonProps> = ({
  onClick,
  children,
  hasError,
}) => {
  return (
    <Button
      className="min-w-0 px-2"
      color={hasError ? 'danger' : 'primary'}
      variant="light"
      radius="full"
      onClick={onClick}
      onPress={onClick}
      type="button"
    >
      {children}
    </Button>
  )
}
