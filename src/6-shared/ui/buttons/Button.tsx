import { styled, Theme } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';
import { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { COLOR_CREAM, COLOR_GREEN } from '../../constants';

type ColorType = keyof Theme['palette'];

type BorderType = 'primary' | 'secondary' | undefined;

export const hoverStyles: any = {
  primary: {
    color: COLOR_GREEN,
  },
  secondary: {
    color: COLOR_CREAM,
  },
};

// Цвета бордера для разных состояний
const borderColors: Record<'primary' | 'secondary', string> = {
  primary: COLOR_GREEN,
  secondary: COLOR_CREAM,
};

// Расширяем ButtonProps
interface CustomButtonProps extends Omit<MuiButtonProps, 'color'> {
  color?: ColorType;
  border?: BorderType;
}

// Основной стиль кнопки
const Button = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'border',
})<CustomButtonProps>(({ theme, color = 'primary', border = undefined }) => {
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

  // Определяем бордер
  const borderStyle = border !== undefined ? `2px solid ${borderColors[border]}` : 'none';

  return {
    backgroundColor: styles?.backgroundColor,
    color: styles?.color,
    border: borderStyle,
    borderRadius: '16px',
    padding: '8px 16px',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: styles?.hoverBackgroundColor,
      color: styles?.hoverColor,
      borderColor: border ? styles?.hoverBorderColor : 'none',
    },
  };
});

export default Button;
