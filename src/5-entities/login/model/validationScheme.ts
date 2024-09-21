import * as yup from 'yup'

const genericTokenSchema = yup
  .string()
  .required('Токен обязателен')
  .min(10, 'Длина токена должна составлять не менее 10 символов')
  .matches(
    /^[^\s\u0400-\uFFFF]+$/,
    'Токен не может содержать пробелов или символов кириллицы'
  )

export const singleTokenSchema = yup.object().shape({
  token: genericTokenSchema,
})

export const tokenAndUrlSchema = yup.object().shape({
  instanceUrl: yup
    .string()
    .required('URL обязателен')
    .matches(/^(https?:\/\/[^\s]+)$/, 'URL не валидный'),
  token: genericTokenSchema,
})
