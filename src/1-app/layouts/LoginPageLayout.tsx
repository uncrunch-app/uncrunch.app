import { Logo } from '@/src/6-shared/ui/logo'
import { ReactNode } from 'react'

const LoginPageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // Используем 100vh для полной высоты вьюпорта
        margin: 0, // Убираем отступы
        padding: 0,
      }}
    >
      <header>
        <Logo width="64" height="64" />
      </header>
      <div style={{ flex: 1 }}>
        {' '}
        {/* Этот div растягивается, чтобы заполнять пространство */}
        {children}
      </div>
      <footer
        style={{
          //backgroundColor: '#f1f1f1', // Цвет фона футера
          padding: '100px 5px 5px', // Внутренние отступы футера
          display: 'flex',
          fontWeight: '300',
          fontSize: '14px',
          color: '#44564a'
        }}
      >
        All rights <br/>
        source code on github <br/>
        
        Copyright (c) 2024 by Igor Teplostanski
      </footer>
    </div>
  )
}

export default LoginPageLayout
