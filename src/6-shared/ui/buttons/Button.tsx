import { FC, ReactNode } from 'react'
import {
  Button as NextUIButton,
  ButtonProps as NextUIButtonProps,
  cn,
} from '@nextui-org/react'

interface ButtonProps extends NextUIButtonProps {
  onClick?: () => void
  className?: string
  children: ReactNode
}

export const Button: FC<ButtonProps> = ({
  onClick,
  className,
  children,
  ...props
}) => {
  return (
    <NextUIButton
      radius="lg"
      className={cn('h-12', className)}
      onClick={onClick}
      onPress={onClick}
      {...props}
    >
      {children}
    </NextUIButton>
  )
}
