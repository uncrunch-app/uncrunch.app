import { createTheme } from '@mui/material/styles';
import { COLOR_CREAM, COLOR_DARK, COLOR_GREEN } from '../constants';
import '@/src/6-shared/constants/colors.scss';

import 'normalize.css/normalize.css';
import '@fontsource/inter/200.css';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import '@fontsource/inter/900.css';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: COLOR_GREEN,
      contrastText: COLOR_CREAM,
    },
    secondary: {
      main: COLOR_CREAM,
      contrastText: COLOR_GREEN,
    },
    success: {
      main: '#4caf50',
      contrastText: '#fff',
    },
    warning: {
      main: '#ff9800',
      contrastText: '#fff',
    },
    background: {
      default: '#f4f6f8',
      paper: '#fff',
    },
    text: {
      primary: '#1f1f2d',
      secondary: '#6e6e6e',
      disabled: '#bdbdbd',
    },

  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h1: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 700,
      fontSize: '3rem',
    },
    h2: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: '2.5rem',
    },
    body1: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 400,
      fontSize: '1rem',
    },
    body2: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 200,
      fontSize: '0.9rem',
    },
    button: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 500,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
        },
        body: {
          backgroundColor: COLOR_CREAM,
          fontFamily: '"Inter", sans-serif',
          color: COLOR_DARK,
        },
        p: {
          margin: 0,
        },
      },
    },
  },
});

export default theme;
