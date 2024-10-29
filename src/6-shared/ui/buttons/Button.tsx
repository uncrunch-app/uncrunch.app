//import { styled, Theme } from '@mui/material/styles'
//import MuiButton from '@mui/material/Button'
//import { ButtonProps as MuiButtonProps } from '@mui/material/Button'
//import * as COLOR from '@/src/6-shared/constants/colors'

//type ColorType = keyof Theme['palette']

//type BorderType = 'primary' | 'secondary' | undefined

//export const hoverStyles: any = {
//  primary: {
//    border: COLOR.GREEN,
//    bg: COLOR.GREEN_80,
//  },
//  secondary: {
//    border: COLOR.CREAM,
//    bg: COLOR.GREEN_20,
//  },
//}

//// Цвета бордера для разных состояний
//const borderColors: Record<'primary' | 'secondary', string> = {
//  primary: COLOR.GREEN,
//  secondary: COLOR.CREAM,
//}

//// Расширяем ButtonProps
//interface CustomButtonProps extends Omit<MuiButtonProps, 'color'> {
//  color?: ColorType
//  border?: BorderType
//}

//// Основной стиль кнопки
//const Button = styled(MuiButton, {
//  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'border',
//})<CustomButtonProps>(({ theme, color = 'primary', border = undefined }) => {
//  const buttonStyles: Partial<
//    Record<
//      ColorType,
//      {
//        backgroundColor: string
//        color: string
//        borderColor: string
//        hoverBackgroundColor: string
//        hoverColor: string
//        hoverBorderColor: string
//      }
//    >
//  > = {
//    primary: {
//      backgroundColor: theme.palette.primary.main,
//      color: '#f3e5e4',
//      borderColor: theme.palette.primary.contrastText,
//      hoverBackgroundColor: hoverStyles.primary.bg,
//      hoverColor: theme.palette.primary.contrastText,
//      hoverBorderColor: hoverStyles.primary.border,
//    },
//    secondary: {
//      backgroundColor: theme.palette.secondary.main,
//      color: theme.palette.secondary.contrastText,
//      borderColor: theme.palette.secondary.contrastText,
//      hoverBackgroundColor: hoverStyles.secondary.bg,
//      hoverColor: theme.palette.secondary.contrastText,
//      hoverBorderColor: theme.palette.secondary.contrastText,
//    },
//    success: {
//      backgroundColor: theme.palette.success.main,
//      color: theme.palette.success.contrastText,
//      borderColor: theme.palette.success.main,
//      hoverBackgroundColor: theme.palette.warning.main,
//      hoverColor: theme.palette.warning.contrastText,
//      hoverBorderColor: theme.palette.warning.main,
//    },
//    warning: {
//      backgroundColor: theme.palette.warning.main,
//      color: theme.palette.warning.contrastText,
//      borderColor: theme.palette.warning.main,
//      hoverBackgroundColor: theme.palette.success.main,
//      hoverColor: theme.palette.success.contrastText,
//      hoverBorderColor: theme.palette.success.main,
//    },
//    // Можно добавить другие варианты при необходимости
//  }

//  // Получаем стили для кнопки по выбранному цвету
//  const styles = buttonStyles[color] || buttonStyles.primary

//  // Определяем бордер
//  const borderStyle =
//    border !== undefined ? `1px solid ${borderColors[border]}` : 'none'

//  return {
//    backgroundColor: styles?.backgroundColor,
//    color: styles?.color,
//    border: borderStyle,
//    borderRadius: '20px',
//    padding: '12px 16px',
//    textTransform: 'none',
//    '&:hover': {
//      backgroundColor: styles?.hoverBackgroundColor,
//      color: styles?.hoverColor,
//      borderColor: border ? styles?.hoverBorderColor : 'none',
//    },
//    '&.Mui-disabled': {
//      backgroundColor: theme.palette.action.disabledBackground, // Цвет фона при disabled
//      color: theme.palette.action.disabled, // Цвет текста при disabled
//      borderColor: border ? theme.palette.action.disabledBackground : 'none',
//    },
//  }
//})

//export default Button
