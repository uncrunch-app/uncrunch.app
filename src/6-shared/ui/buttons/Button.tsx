import { styled, Theme } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';
import { ButtonProps as MuiButtonProps } from '@mui/material/Button';

// Тип для color
type ColorType = keyof Theme['palette'];

// Расширяем ButtonProps
interface CustomButtonProps extends Omit<MuiButtonProps, 'color'> {
  color?: ColorType;
  border?: boolean; // Новый проп для управления отображением бордера
}

// src/styles/customButtonStyles.ts
export const hoverStyles: any = {
  primary: {
    backgroundColor: '#00FF00', // кастомный цвет для primary при hover
    color: '#FF00FF',
    borderColor: '#00FFFF',
  },
  secondary: {
    backgroundColor: '#FF00FF', // кастомный цвет для secondary при hover
    color: '#00FF00',
    borderColor: '#FFFF00',
  },
  success: {
    backgroundColor: '#00FFFF',
    color: '#FFFF00',
    borderColor: '#00FF00',
  },
  warning: {
    backgroundColor: '#FFFF00',
    color: '#00FFFF',
    borderColor: '#FF00FF',
  },
  // Добавь другие кастомные стили при необходимости
};

const Button = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'border',
})<CustomButtonProps>(({ theme, color = 'primary', border = false }) => {
  const buttonStyles: Partial<
    Record<
      ColorType,
      {
        backgroundColor: string;
        color: string;
        borderColor: string;
        hoverBackgroundColor: string;
        hoverColor: string;
        hoverBorderColor: string;
      }
    >
  > = {
    primary: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      borderColor: theme.palette.primary.contrastText,
      hoverBackgroundColor: theme.palette.secondary.main,
      hoverColor: theme.palette.secondary.contrastText,
      hoverBorderColor: hoverStyles.primary.color,
    },
    secondary: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      borderColor: theme.palette.secondary.contrastText,
      hoverBackgroundColor: theme.palette.primary.main,
      hoverColor: theme.palette.primary.contrastText,
      hoverBorderColor: theme.palette.secondary.main,
    },
    success: {
      backgroundColor: theme.palette.success.main,
      color: theme.palette.success.contrastText,
      borderColor: theme.palette.success.main,
      hoverBackgroundColor: theme.palette.warning.main,
      hoverColor: theme.palette.warning.contrastText,
      hoverBorderColor: theme.palette.warning.main,
    },
    warning: {
      backgroundColor: theme.palette.warning.main,
      color: theme.palette.warning.contrastText,
      borderColor: theme.palette.warning.main,
      hoverBackgroundColor: theme.palette.success.main,
      hoverColor: theme.palette.success.contrastText,
      hoverBorderColor: theme.palette.success.main,
    },
    // Можно добавить другие варианты при необходимости
  };

  // Получаем стили для кнопки по выбранному цвету
  const styles = buttonStyles[color] || buttonStyles.primary;

  return {
    backgroundColor: styles?.backgroundColor,
    color: styles?.color,
    border: border ? `2px solid ${styles?.borderColor}` : 'none', // Управление бордером
    borderRadius: '16px',
    padding: '8px 16px',
    '&:hover': {
      backgroundColor: styles?.hoverBackgroundColor,
      color: styles?.hoverColor,
      borderColor: border ? styles?.hoverBorderColor : 'none', // Управление бордером при ховере
    },
  };
});

export default Button;
