import { createTheme } from '@mui/material/styles'

export const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#050816',   // ← fond corrigé
      paper: '#2b3550',
    },
    primary: {
      main: '#3b82f6',
    },
    success: {
      main: '#22c55e',
    },
    error: {
      main: '#ef4444',
    },
    text: {
      primary: '#e5e7eb',
      secondary: '#9ca3af',
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: '"Roboto Slab", serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: '"Roboto Slab", serif',
        },
      },
    },
  },
})