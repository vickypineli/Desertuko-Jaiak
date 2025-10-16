import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './i18n'; // importa la configuración global de i18n
import { LanguageProvider } from './contexts/LanguageProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
);

