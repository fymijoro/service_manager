import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, CssBaseline, StyledEngineProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { muiTheme } from './theme/muiTheme.js'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  </StrictMode>,
)