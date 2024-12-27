import { FC } from 'react'
import { Button, ButtonProps, cn } from '@nextui-org/react'

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

      <Button fullWidth className={cn("uppercase rounded-large h-12", className)} {...props}>
        {buttonText}
      </Button>
    </div>
  )
}
