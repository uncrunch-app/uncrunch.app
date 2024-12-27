export const ROUTES = {
  root: '/',
  login: '/login',
  loginWithCallback: (callbackUrl: string) =>
    `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`,
  proxy: (url: string, token: string) =>
    `/api/proxy?url=${encodeURIComponent(url)}&token=${token}`,
  teapot: '/418',

  // Protected
  home: (username: string) => `/~${username}`,
  secret: (username: string) => `/~${username}/secret`,
  notes: (username: string) => `/~${username}/notes`,
  todo: (username: string) => `/~${username}/todo`,
  boards: (username: string) => `/~${username}/boards`,
  settings: (username: string) => `/~${username}/settings`,
  repos: (username: string) => `/~${username}/repos`,

  // Test pages
  test0: (username: string) => `/~${username}/t0`,
  test1: (username: string) => `/~${username}/t1`,
  test2: (username: string) => `/~${username}/t2`,
} as const
