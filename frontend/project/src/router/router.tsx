import { createBrowserRouter } from 'react-router-dom';
import { PrivateRoute } from '../components/private-route/private-route';
import { AppRoute, AuthorizationStatus } from '../constants';
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
        path: AppRoute.Login,
        element: <Login />,
      },
      {
        path: AppRoute.Products,
        element: (
          <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
            <ProductList />
          </PrivateRoute>
        ),
      },
      {
        path: AppRoute.Register,

        element: (
          <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
            <Register />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
