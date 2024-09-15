import { ReactNode } from 'react'
import { Header } from '@/src/3-widgets/header'

const HomePageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default HomePageLayout
