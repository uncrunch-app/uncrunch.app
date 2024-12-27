import { useTranslations } from 'next-intl'
import * as yup from 'yup'

export const useValidationSchemas = () => {
  const t = useTranslations('Messages.validation.loginForm')

  const genericTokenSchema = yup
    .string()
    .required(t('tokenRequired'))
    .min(10, t('tokenMinLength'))
    .matches(/^[^\s\u0400-\uFFFF]+$/, t('tokenInvalid'))

  const singleTokenSchema = yup.object().shape({
    token: genericTokenSchema,
  })

  const tokenAndUrlSchema = yup.object().shape({
    instanceUrl: yup
      .string()
      .required(t('urlRequired'))
      .matches(
        /^(?!-)([a-zA-Z0-9-]{1,63}(?<!-)\.)+[a-zA-Z]{2,}$/,
        t('urlInvalid')
      ),
    token: genericTokenSchema,
    apiEndpoint: yup
      .string()
      .nullable()
      .notOneOf([''], 'не должен быть пустым')
      .matches(/^\/[a-zA-Z0-9-._~\/?#=&%]*$/, 'недопустимый апи эндпоинт'),
  })

  return { singleTokenSchema, tokenAndUrlSchema }
}
