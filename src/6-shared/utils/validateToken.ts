// Интерфейс для параметров GitHub
interface GithubTokenParams {
  token?: string;
}

// Интерфейс для параметров Forgejo
interface ForgejoTokenParams {
  token?: string;
  baseUrl: string;
}
interface ValidateTokenParams {
  token: string;
  baseUrl?: string; // Необязательный параметр для Forgejo
}

interface ValidateToken<T> {
  token: string;
  trigger: (params: T) => Promise<any>;
  baseUrl?: string;
}

export const validateToken = async <T>({
  token,
  trigger,
  baseUrl,
}: ValidateToken<T>) => {
  let requestParams: any = { token }
  if (baseUrl) {
    requestParams = { token, baseUrl } as ForgejoTokenParams
  }

  const { data, error } = await trigger(requestParams)

  if (error) {
    return {
      error:
        (error as any).data?.message,
    }
  }

  return {
    name: data?.name || null,
    login: data?.login || null,
    image: data?.avatar_url || null,
  }
}
