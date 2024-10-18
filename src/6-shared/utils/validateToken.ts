interface ValidateTokenParams {
  token: string;
  baseUrl: string;
  trigger: (params: { token: string; baseUrl: string }) => Promise<any>;
}

export const validateToken = async ({
  token,
  baseUrl,
  trigger,
}: ValidateTokenParams) => {
  const requestParams = { token, baseUrl };

  const { data, error } = await trigger(requestParams);

  if (error) {
    return {
      error: (error as any).data?.message,
    };
  }

  return {
    name: data?.name || null,
    login: data.login,
    image: data?.avatar_url || null,
  };
};
