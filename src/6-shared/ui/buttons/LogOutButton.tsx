'use client'

import { Button } from '@nextui-org/button'
import { signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { HiArrowLeftStartOnRectangle } from 'react-icons/hi2'

const LogOutButton = () => {
  const t = useTranslations('Components')

  return (
    <Button
      startContent={<HiArrowLeftStartOnRectangle size={22} />}
      color="primary"
      onClick={() => signOut()}
    >
      {t('logOutButton')}
    </Button>
  )
}

export default LogOutButton
