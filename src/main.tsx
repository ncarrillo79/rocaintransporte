import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { applyBrand } from './lib/brand';
import './styles/tokens.css';
import './styles/global.css';

applyBrand();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
