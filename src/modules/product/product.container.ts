import { AppComponent } from '../../types/app-component.enum.js';
import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { ProductServiceInterface } from './product-service.interface.js';
import { ProductService } from './product-service.js';
import { ProductEntity, ProductModel } from './product.entity.js';

export function createProductContainer() {
  const productContainer = new Container();

  productContainer
    .bind<ProductServiceInterface>(AppComponent.ProductServiceInterface)
    .to(ProductService);
  productContainer
    .bind<types.ModelType<ProductEntity>>(AppComponent.ProductModel)
    .toConstantValue(ProductModel);

  return productContainer;
}
