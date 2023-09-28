import { createBrowserRouter } from 'react-router-dom';
import { ErrorPage } from '../pages/error-page/error-page';
import { Layout } from '../pages/layout/layout';
import { Login } from '../pages/login/login';
import { ProductList } from '../pages/product-list/product-list';
import { Register } from '../pages/register/register';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: '/products',
        element: <ProductList />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
]);
