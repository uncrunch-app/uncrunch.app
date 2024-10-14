//import LocaleSwitcher from '@/src/6-shared/LocaleSwitcher'
import { Logo } from '@/src/6-shared/ui/logo'
import ThemeSwitcher from '@/src/6-shared/ui/ThemeSwitcher'
import { ReactNode } from 'react'
import { cookies } from "next/headers";
import { getServerTheme } from '@/src/6-shared/utils/getServerTheme';

const LoginPageLayout = ({ children }: { children: ReactNode }) => {
  const initialTheme = getServerTheme();
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
      <header
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Logo width="64" height="64" />
        {/*<LocaleSwitcher />*/}
        <ThemeSwitcher initialTheme={initialTheme} />
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
          color: '#44564a',
        }}
      >
        All rights <br />
        source code on github <br />
        Copyright (c) 2024 by Igor Teplostanski
      </footer>
    </div>
  )
}

export default LoginPageLayout
