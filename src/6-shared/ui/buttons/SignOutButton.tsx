'use client' // Указываем, что это клиентский компонент

import { Button } from '@nextui-org/react'
import { signOut } from 'next-auth/react'
//import Button from './Button'

const SignOutButton = () => {
  return <Button color='secondary' onClick={() => signOut()}>Sign Out</Button>
}

export default SignOutButton
