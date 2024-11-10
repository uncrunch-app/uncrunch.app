type DynamicRoute<T extends string[] = [string]> = (...args: T) => string

interface Routes {
  root: string
  login: string
  teapot: string
  loginWithCallback: DynamicRoute<[string]>
  proxy: DynamicRoute<[string, string]>
  home: DynamicRoute<[string]>
  secret: DynamicRoute<[string]>
  notes: DynamicRoute<[string]>
  todo: DynamicRoute<[string]>
  boards: DynamicRoute<[string]>
  settings: DynamicRoute<[string]>
  repos: DynamicRoute<[string]>
  test0: DynamicRoute<[string]>
  test1: DynamicRoute<[string]>
  test2: DynamicRoute<[string]>
}

export const routes: Routes = {
  root: '/',
  login: '/login',
  loginWithCallback: (callbackUrl) =>
    `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`,
  proxy: (url, token) =>
    `/api/proxy?url=${encodeURIComponent(url)}&token=${token}`,
  teapot: '/418',

  // Protected
  home: (username) => `/~${username}`,
  secret: (username) => `/~${username}/secret`,
  notes: (username) => `/~${username}/notes`,
  todo: (username) => `/~${username}/todo`,
  boards: (username) => `/~${username}/boards`,
  settings: (username) => `/~${username}/settings`,
  repos: (username) => `/~${username}/repos`,

  // Test pages
  test0: (username) => `/~${username}/t0`,
  test1: (username) => `/~${username}/t1`,
  test2: (username) => `/~${username}/t2`,
}
