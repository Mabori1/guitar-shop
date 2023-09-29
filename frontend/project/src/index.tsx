import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App2 from './components/app/app2';
import { ErrorMessage } from './components/error-message/error-message';
import { store } from './store';
import { fetchProductsAction, checkAuthAction } from './store/api-actions';

store.dispatch(fetchProductsAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App2 />
    </Provider>
  </React.StrictMode>
);
