import { DECIMAL_SYSTEM } from '../../constant.js';
import { GuitarType } from '../../types/guitar-type.enum.js';
import { Product } from '../../types/product.type.js';
import { StringsCount } from '../../types/strings-count.enum.js';

export function createProduct(productData: string): Product {
  const [
    title,
    description,
    createdDate,
    photo,
    guitarType,
    article,
    stringCount,
    price,
  ] = productData.replace('\n', '').split('\t');

  return {
    title,
    description,
    addedDate: new Date(createdDate),
    photo,
    guitarType: guitarType as GuitarType,
    article,
    stringCount: Number.parseInt(stringCount, DECIMAL_SYSTEM) as StringsCount,
    price: Number.parseInt(price, DECIMAL_SYSTEM),
  } as Product;
}
