interface ValidateTokenParams {
  token: string
  baseUrl: string
  trigger: (params: { token: string; baseUrl: string }) => Promise<any>
}

export const validateToken = async ({
  token,
  baseUrl,
  trigger,
}: ValidateTokenParams) => {
  const requestParams = { token, baseUrl }

  const { data, error } = await trigger(requestParams)

  if (error) {
    // Если это 401:
    if (error.status === 401) {
      return {
        error: {
          title: 'Токен невалиден',
          status: error.status,
          message: error.data?.error,
        },
      }
    }

    return {
      error: {
        title: 'Никогда такого не было и вот опять',
        status: error.status,
        message: error.data?.error,
      },
    }
  }

  return {
    name: data?.name || null,
    login: data.login,
    image: data?.avatar_url || null,
  }
}
