import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import AddProduct from '../../pages/add-product/add-product';
import EditProduct from '../../pages/edit-product/edit-product';
import { ErrorPage } from '../../pages/error-page/error-page';
import LoadingPage from '../../pages/loading-page/loading-page';
import Login from '../../pages/login/login';
import Product from '../../pages/product/product';
import Products from '../../pages/products/products';
import Registration from '../../pages/registration/registration';
import { Layout } from '../layout/layout';
import { ProtectedRoute } from '../protected-route/protected-route';

export default function App(): JSX.Element {
  const authStatus = useAppSelector((state) => state.authStatus);
  const isDataLoading = useAppSelector((state) => state.isDataLoading);

  if (authStatus === AuthStatus.Unknown || !isDataLoading) {
    return <LoadingPage />;
  }

  const isAccess = authStatus === AuthStatus.Auth;

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Login} element={<Layout />}>
          <Route path={AppRoute.Login} element={<Login />} />
          <Route path={AppRoute.Register} element={<Registration />} />
          <Route element={<ProtectedRoute access={isAccess} />}>
            <Route path={AppRoute.Products} element={<Products />} />
            <Route path={AppRoute.Product} element={<Product />} />
            <Route path={AppRoute.NewProduct} element={<AddProduct />} />
            <Route path={AppRoute.UpdateProduct} element={<EditProduct />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
