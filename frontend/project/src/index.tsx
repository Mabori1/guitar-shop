import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { ErrorMessage } from './components/error-message/error-message';
import { store } from './store';
import { fetchProductsAction, checkAuthAction } from './store/api-actions';
import { ToastContainer } from 'react-toastify';

store.dispatch(fetchProductsAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <ErrorMessage />
      <App />
    </Provider>
  </React.StrictMode>
);
