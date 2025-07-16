import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
const theme = createTheme();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);