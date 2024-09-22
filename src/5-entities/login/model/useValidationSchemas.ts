import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

export const useValidationSchemas = () => {
  const { t } = useTranslation('validation'); // Загружаете нужный неймспейс

  const genericTokenSchema = yup
    .string()
    .required(t('token_required')) // Используйте t для локализации
    .min(10, t('token_min_length')) // Используйте t для локализации
    .matches(
      /^[^\s\u0400-\uFFFF]+$/,
      t('token_invalid') // Используйте t для локализации
    );

  const singleTokenSchema = yup.object().shape({
    token: genericTokenSchema,
  });

  const tokenAndUrlSchema = yup.object().shape({
    instanceUrl: yup
      .string()
      .required(t('url_required')) // Используйте t для локализации
      .matches(/^(https?:\/\/[^\s]+)$/, t('url_invalid')), // Используйте t для локализации
    token: genericTokenSchema,
  });

  return { singleTokenSchema, tokenAndUrlSchema };
};
