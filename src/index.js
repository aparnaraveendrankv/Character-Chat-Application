import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import
import App from './App';
import { SnackbarProvider } from 'notistack';

// Create root using the new API
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SnackbarProvider maxSnack={3}>
    <App />
  </SnackbarProvider>
);
