import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AppRoute } from '../../const';
import AddProduct from '../../pages/add-product/add-product';
import EditProduct from '../../pages/edit-product/edit-product';
import { ErrorPage } from '../../pages/error-page/error-page';
import Login from '../../pages/login/login';
import Product from '../../pages/product/product';
import Products from '../../pages/products/products';
import Registration from '../../pages/registration/registration';
import { Layout } from '../layout/layout';

export default function App2(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Login} element={<Layout />}>
          <Route index element={<Login />} />
          <Route path={AppRoute.Register} element={<Registration />} />
          <Route path={AppRoute.Products} element={<Products />} />
          <Route path={AppRoute.Product} element={<Product />} />
          <Route path={AppRoute.NewProduct} element={<AddProduct />} />
          <Route path={AppRoute.UpdateProduct} element={<EditProduct />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
