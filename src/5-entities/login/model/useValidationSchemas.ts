import { useTranslations } from 'next-intl'
import * as yup from 'yup'
//import { useTranslation } from 'react-i18next'

export const useValidationSchemas = () => {
  const t = useTranslations('Validation')

  const genericTokenSchema = yup
    .string()
    .required(t('token_required'))
    .min(10, t('token_min_length'))
    .matches(/^[^\s\u0400-\uFFFF]+$/, t('token_invalid'))

  const singleTokenSchema = yup.object().shape({
    token: genericTokenSchema,
  })

  const tokenAndUrlSchema = yup.object().shape({
    instanceUrl: yup
      .string()
      .required(t('url_required'))
      .matches(/^(https?:\/\/[^\s]+)$/, t('url_invalid')),
    token: genericTokenSchema,
  })

  return { singleTokenSchema, tokenAndUrlSchema }
}
