import { createTheme } from '@mui/material/styles'

import {
  COLOR_BLACK,
  COLOR_BLACK_20,
  COLOR_BLACK_40,
  COLOR_BLACK_60,
  COLOR_CREAM,
  COLOR_GREEN,
  COLOR_RED,
  COLOR_WHITE,
  COLOR_YELLOW,
} from '../constants/colors'
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
      main: COLOR_GREEN,
      contrastText: COLOR_CREAM,
    },
    secondary: {
      main: COLOR_CREAM,
      contrastText: COLOR_GREEN,
    },
    success: {
      main: COLOR_RED,
      contrastText: COLOR_WHITE,
    },
    warning: {
      main: COLOR_YELLOW,
      contrastText: COLOR_BLACK,
    },
    background: {
      default: COLOR_CREAM,
      paper: COLOR_WHITE,
    },
    text: {
      primary: COLOR_BLACK,
      secondary: COLOR_WHITE,
      disabled: COLOR_BLACK_60,
    },
    action: {
      disabled: COLOR_BLACK_40,
      disabledBackground: COLOR_BLACK_20,
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
          backgroundColor: COLOR_CREAM,
          fontFamily: FONT_FAMILY,
          color: COLOR_BLACK,
        },
        p: {
          margin: 0,
        },
      },
    },
  },
})

export default theme
