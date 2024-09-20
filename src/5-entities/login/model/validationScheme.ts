import * as yup from 'yup'

const tokenSchema = yup
  .string()
  .required('Токен обязателен')
  .min(10, 'Длина токена должна составлять не менее 10 символов')
  .matches(
    /^[^\s\u0400-\uFFFF]+$/,
    'Токен не может содержать пробелов или символов кириллицы'
  )

export const githubSchema = yup.object().shape({
  token: tokenSchema,
})

export const forgejoSchema = yup.object().shape({
  instanceUrl: yup
    .string()
    .required('URL обязателен')
    .matches(/^(https?:\/\/[^\s]+)$/, 'URL не валидный'),
  token: tokenSchema,
})
