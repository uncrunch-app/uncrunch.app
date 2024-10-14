import * as yup from 'yup'
//import { useTranslation } from 'react-i18next'

export const useValidationSchemas = () => {
  const genericTokenSchema = yup
    .string()
    .required('token_required') // Используйте t для локализации
    .min(10, 'token_min_length') // Используйте t для локализации
    .matches(
      /^[^\s\u0400-\uFFFF]+$/,
      'token_invalid' // Используйте t для локализации
    )

  const singleTokenSchema = yup.object().shape({
    token: genericTokenSchema,
  })

  const tokenAndUrlSchema = yup.object().shape({
    instanceUrl: yup
      .string()
      .required('url_required') // Используйте t для локализации
      .matches(/^(https?:\/\/[^\s]+)$/, 'url_invalid'), // Используйте t для локализации
    token: genericTokenSchema,
  })

  return { singleTokenSchema, tokenAndUrlSchema }
}
