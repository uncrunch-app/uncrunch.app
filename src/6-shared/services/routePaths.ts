type RouteFunction = (username: string) => string

interface RoutePaths {
  root: RouteFunction
  secret: RouteFunction
  notes: RouteFunction
  todo: RouteFunction
  boards: RouteFunction
  settings: RouteFunction
}

export const routePaths: RoutePaths = {
  root: (username) => `/~${username}`,
  secret: (username) => `/~${username}/secret`,
  notes: (username) => `/~${username}/notes`,
  todo: (username) => `/~${username}/todo`,
  boards: (username) => `/~${username}/boards`,
  settings: (username) => `/~${username}/settings`
}
