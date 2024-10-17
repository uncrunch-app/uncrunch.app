import { useTranslations } from 'next-intl'
import * as yup from 'yup'
//import { useTranslation } from 'react-i18next'

export const useValidationSchemas = () => {
  const t = useTranslations('Validation')

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
      .matches(/^(https?:\/\/[^\s]+)$/, t('urlInvalid')),
    token: genericTokenSchema,
  })

  return { singleTokenSchema, tokenAndUrlSchema }
}
