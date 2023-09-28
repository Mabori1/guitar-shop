import { Routes, Route } from 'react-router-dom';
import { browserHistory } from '../../browser-history';
import { AppRoute } from '../../constants';
import { AddProduct } from '../../pages/add-product/add-product';
import { EditProduct } from '../../pages/edit-product/edit-product';
import { Layout } from '../../pages/layout/layout';
import { Login } from '../../pages/login/login';
import { ProductList } from '../../pages/product-list/product-list';
import { Product } from '../../pages/product/product';
import { Register } from '../../pages/register/register';
import { PrivateRoute } from '../private-route/private-route';
import { HistoryRouter } from '../history-route/history-route';
import { ErrorPage } from '../../pages/error-page/error-page';

export function App(): JSX.Element {
  const authStatus = useAppSelector((state) => state.authStatus);
  const isDataLoading = useAppSelector((state) => state.isDataLoading);

  if (authStatus === AccessType.unknown || isDataLoading) {
    return <LoadingPage />;
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Login} element={<Layout />}>
          <Route index element={<Login />} />
          <Route path={AppRoute.Register} element={<Register />} />
          <Route element={<PrivateRoute access={authStatus} />}>
            <Route path={AppRoute.Products} element={<ProductList />} />
            <Route path={AppRoute.Product} element={<Product />} />
            <Route path={AppRoute.NewProduct} element={<AddProduct />} />
            <Route path={AppRoute.UpdateProduct} element={<EditProduct />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </HistoryRouter>
  );
}
