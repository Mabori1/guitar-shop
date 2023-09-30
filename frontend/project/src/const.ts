export enum AuthStatus {
  Auth = 'authorized',
  NoAuth = 'unauthorized',
  Unknown = 'unknown',
  Loading = 'LOADING',
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
  Register = 'users/register',
  Login = 'users/login',
  Logout = 'users/logout',
}

export const LIMIT_PAGE = 7;

export enum NameSpace {
  Products = 'products',
  ActiveProduct = 'active',
  User = 'user',
  Service = 'service',
}

export enum FetchStatus {
  Idle = 'Idle',
  Loading = 'Loading',
  Success = 'Success',
  Failed = 'Failed',
}
