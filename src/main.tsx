import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { applyBrand } from './lib/brand';
import { CartProvider } from './store/Cart';
import './styles/tokens.css';
import './styles/global.css';

applyBrand();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>,
);
