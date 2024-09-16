import { Logo } from '@/src/6-shared/ui/logo'
import { ReactNode } from 'react'

const LoginPageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Logo width='64' height='64'/>
      {children}
    </>
  )
}

export default LoginPageLayout
