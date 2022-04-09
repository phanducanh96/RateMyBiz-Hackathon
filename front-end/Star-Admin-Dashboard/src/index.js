import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import "./i18n";
import * as serviceWorker from './serviceWorker';
import { AuthProvider } from "./app/contexts/AuthContext";

ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter basename="/rate-my-biz">
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
  </React.StrictMode>
, document.getElementById('root'));

serviceWorker.unregister();