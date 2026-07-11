import React from 'react';
import ReactDOM from 'react-dom/client';
// Self-hosted fonts — bundled by Vite, no Google Fonts request at runtime.
import '@fontsource/anton/400.css';
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/600.css';
import '@fontsource/space-mono/400.css';
import '@fontsource/space-mono/700.css';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
