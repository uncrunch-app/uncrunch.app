import { GitHostingType } from "../types"

interface GitHostingEndpoints {
  user: { getUser: string }
  repo: {
    getListRepos:string
    getRepo: (owner: string, repo: string) => string
  }
}

const githubEndpoints: GitHostingEndpoints = {
  user: {
    getUser: '/user',
  },
  repo: {
    getListRepos: '/user/repos',
    getRepo: (owner, repo) => `/repos/${owner}/${repo}`,
  },
} as const

const forgejoEndpoints: GitHostingEndpoints = {
  user: {
    getUser: '/user',
  },
  repo: {
    getListRepos: '/user/repos',
    getRepo: (owner, repo) => `/repos/${owner}/${repo}`,
  },
} as const

export const ENDPOINTS: Record<GitHostingType, GitHostingEndpoints> = {
  github: githubEndpoints,
  forgejo: forgejoEndpoints,
};
