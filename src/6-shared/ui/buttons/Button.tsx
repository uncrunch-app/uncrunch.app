// src/components/Button.tsx

import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main, // Основной цвет кнопки
  color: theme.palette.primary.contrastText, // Цвет текста на кнопке
  '&:hover': {
    backgroundColor: theme.palette.primary.dark, // Цвет фона при наведении
  },
}))

export default CustomButton
