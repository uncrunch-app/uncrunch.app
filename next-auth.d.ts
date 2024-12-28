// next-auth.d.ts

import 'next-auth'
import { CustomSessionUser, CustomJWT } from './app/api/auth/authOptions' // Обновите путь, если нужно

declare module 'next-auth' {
  interface User extends CustomSessionUser {} // Расширяем интерфейс User
  interface Session {
    user: CustomSessionUser // Определяем пользовательский тип сессии
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends CustomJWT {} // Расширяем интерфейс JWT
}
