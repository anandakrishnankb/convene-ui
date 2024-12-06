import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { AuthProvider } from './pages/AuthContext';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <AuthProvider>
    <App />
  </AuthProvider>
  </ThemeProvider>,
  document.getElementById('root')
);
