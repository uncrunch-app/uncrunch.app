// src/theme.ts
import { createTheme } from '@mui/material/styles'
import { COLOR_CREAM } from '../constants'

import '@/src/6-shared/constants/colors.scss'

import 'normalize.css/normalize.css'
import '@fontsource/inter/200.css'
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/800.css'
import '@fontsource/inter/900.css'

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
      main: '#1f1f2d',
      contrastText: '#fff',
    },
    secondary: {
      main: '#dc004e',
      contrastText: '#fff',
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
      default: '#f4f6f8', // цвет фона
      paper: '#fff', // цвет фона для компонентов, как Card
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
          color: '#1f1f2d',
        },
        p: {
          margin: 0,
        },
      },
    },
  },
})

export default theme
