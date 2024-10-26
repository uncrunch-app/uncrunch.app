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
}

const forgejoEndpoints: GitHostingEndpoints = {
  user: {
    getUser: '/user',
  },
  repo: {
    getListRepos: '/user/repos',
    getRepo: (owner, repo) => `/repos/${owner}/${repo}`,
  },
}

export const endpoints: Record<GitHostingType, GitHostingEndpoints> = {
  github: githubEndpoints,
  forgejo: forgejoEndpoints,
};
