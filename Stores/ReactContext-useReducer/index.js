import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import {StoreProvider} from "./stores/store.js"

import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StoreProvider>
    <App />
  </StoreProvider>
);
