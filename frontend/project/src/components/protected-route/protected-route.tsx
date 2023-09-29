import { Outlet, Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';

type Access = {
  access: boolean;
};

export const ProtectedRoute = ({ access }: Access) =>
  access ? <Outlet /> : <Navigate to={AppRoute.Login} replace />;
