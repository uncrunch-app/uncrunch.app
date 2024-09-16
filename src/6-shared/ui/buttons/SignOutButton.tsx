'use client' // Указываем, что это клиентский компонент

import { signOut } from 'next-auth/react'
import Button from './Button'

const SignOutButton = () => {
  return <Button color='secondary' border='secondary' onClick={() => signOut()}>Sign Out</Button>
}

export default SignOutButton
