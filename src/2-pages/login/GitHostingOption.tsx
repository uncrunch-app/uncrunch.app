import { FC } from 'react'
import { Button } from '@/src/6-shared/ui/buttons/Button'

interface GitHostingOptionProps {
  buttonText: string
  description: string
  onClick: () => void
}

export const GitHostingOption: FC<GitHostingOptionProps> = ({
  buttonText,
  description,
  onClick,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-light">{description}</p>

      <Button fullWidth className="uppercase" onClick={onClick}>
        {buttonText}
      </Button>
    </div>
  )
}
