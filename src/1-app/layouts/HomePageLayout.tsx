import { ReactNode } from 'react'
import { Header } from '@/widgets/header'

const HomePageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default HomePageLayout
