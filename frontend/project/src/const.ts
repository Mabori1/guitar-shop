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
  Login = '/users/login',
  Logout = '/users/logout',
}

export const LIMIT_PAGE = 7;

export enum NameSpace {
  Products = 'products',
  ActiveProduct = 'active',
  User = 'user',
  Service = 'service',
}
