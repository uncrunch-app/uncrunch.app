import {getRequestConfig} from 'next-intl/server';
import { fetchUserLocale } from '../6-shared/services/localeCookies';

export default getRequestConfig(async () => {
  const locale = await fetchUserLocale();

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
