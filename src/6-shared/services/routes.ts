type DynamicRoute<T extends string[] = [string]> = (...args: T) => string

interface Routes {
  root: string
  login: string
  loginWithCallback: DynamicRoute<[string]>
  proxy: DynamicRoute<[string, string]>
  home: DynamicRoute<[string]>
  secret: DynamicRoute<[string]>
  notes: DynamicRoute<[string]>
  todo: DynamicRoute<[string]>
  boards: DynamicRoute<[string]>
  settings: DynamicRoute<[string]>
}

export const routes: Routes = {
  root: '/',
  login: '/login',
  loginWithCallback: (callbackUrl) =>
    `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`,
  proxy: (url, token) =>
    `/api/proxy?url=${encodeURIComponent(url)}&token=${token}`,
  home: (username) => `/~${username}`,
  secret: (username) => `/~${username}/secret`,
  notes: (username) => `/~${username}/notes`,
  todo: (username) => `/~${username}/todo`,
  boards: (username) => `/~${username}/boards`,
  settings: (username) => `/~${username}/settings`,
}
