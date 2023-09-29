export enum AuthStatus {
  Auth = 'authorized',
  NoAuth = 'unauthorized',
  Unknown = 'unknown',
}

export enum AppRoute {
  Login = '/',
  Register = '/register',
  Products = '/products',
  Product = '/product/:productId',
  NewProduct = '/product/new',
  UpdateProduct = '/product/update/:productId',
}

export enum APIRoute {
  Products = '/products',
  Register = '/register',
  Login = '/login',
  Logout = '/logout',
}

export const TIMEOUT_SHOW_ERROR = 2000;
export const LIMIT_PAGE = 7;
