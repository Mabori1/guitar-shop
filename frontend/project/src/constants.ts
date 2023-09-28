export enum AppRoute {
  Root = '/',
  Login = '/',
  Register = '/register',
  Products = '/products',
  Product = '/product/:productId',
  NewProduct = '/product/new',
  UpdateProduct = '/product/update/:productId',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
