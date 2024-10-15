'use client'

import { Button } from '@nextui-org/react'
import { signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { HiArrowLeftStartOnRectangle } from 'react-icons/hi2'

const LogOutButton = () => {
  const t = useTranslations('LogOutButton')
  
  return (
    <Button
      startContent={<HiArrowLeftStartOnRectangle size={22} />}
      color="secondary"
      onClick={() => signOut()}
    >
      {t('logOut')}
    </Button>
  )
}

export default LogOutButton
