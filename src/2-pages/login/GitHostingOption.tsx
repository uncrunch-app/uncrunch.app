import { FC } from 'react'
import { Button, ButtonProps } from '@nextui-org/button'
import cn from 'classnames'

interface GitHostingOptionProps extends ButtonProps {
  buttonText: string
  description: string
}

export const GitHostingOption: FC<GitHostingOptionProps> = ({
  buttonText,
  description,
  className,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-light">{description}</p>

      <Button
        fullWidth
        className={cn('h-12 rounded-large uppercase', className)}
        {...props}
      >
        {buttonText}
      </Button>
    </div>
  )
}
