import { createTheme } from '@mui/material/styles'
import * as COLOR from '@/src/6-shared/constants/colors'
import {
  WIDTH_XS,
  WIDTH_SM,
  WIDTH_MD,
  WIDTH_LG,
  WIDTH_XL,
} from '../constants/breakpoints'

const FONT_FAMILY = '"Inter", sans-serif'

const theme = createTheme({
  breakpoints: {
    values: {
      xs: WIDTH_XS,
      sm: WIDTH_SM,
      md: WIDTH_MD,
      lg: WIDTH_LG,
      xl: WIDTH_XL,
    },
  },
  palette: {
    primary: {
      main: COLOR.GREEN,
      contrastText: COLOR.CREAM,
    },
    secondary: {
      main: COLOR.CREAM,
      contrastText: COLOR.GREEN,
    },
    success: {
      main: COLOR.RED,
      contrastText: COLOR.WHITE,
    },
    warning: {
      main: COLOR.YELLOW,
      contrastText: COLOR.BLACK,
    },
    background: {
      default: COLOR.CREAM,
      paper: COLOR.WHITE,
    },
    text: {
      primary: COLOR.BLACK,
      secondary: COLOR.WHITE,
      disabled: COLOR.BLACK_60,
    },
    action: {
      disabled: COLOR.BLACK_40,
      disabledBackground: COLOR.BLACK_20,
    },
  },
  typography: {
    fontFamily: FONT_FAMILY,
    h1: {
      fontFamily: FONT_FAMILY,
      fontWeight: 700,
      fontSize: '3rem',
    },
    h2: {
      fontFamily: FONT_FAMILY,
      fontWeight: 600,
      fontSize: '2.5rem',
    },
    body1: {
      fontFamily: FONT_FAMILY,
      fontWeight: 400,
      fontSize: '1rem',
    },
    body2: {
      fontFamily: FONT_FAMILY,
      fontWeight: 200,
      fontSize: '0.9rem',
    },
    button: {
      fontFamily: FONT_FAMILY,
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
          backgroundColor: COLOR.CREAM,
          fontFamily: FONT_FAMILY,
          color: COLOR.BLACK,
        },
        p: {
          margin: 0,
        },
        '@keyframes mui-auto-fill': {
          from: { display: 'block' },
        },
        '@keyframes mui-auto-fill-cancel': {
          from: { display: 'block' },
        },
        'input:-webkit-autofill': {
          backgroundColor: `${COLOR.GREEN} !important`,
          WebkitTextFillColor: `${COLOR.BLACK_60} !important`,
          transition:
            'background-color 5000s ease-in-out 0s, color 5000s ease-in-out 0s',
          borderRadius: 'inherit',
          fontWeight: 500,
        },
        'input:-webkit-autofill:focus': {
          WebkitTextFillColor: `${COLOR.GREEN_80} !important`,
        },
        'input:-webkit-autofill:hover': {
          WebkitTextFillColor: `${COLOR.GREEN} !important`,
        },
      },
    },
  },
})

export default theme
