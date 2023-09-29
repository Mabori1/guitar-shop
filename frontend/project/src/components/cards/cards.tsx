import { Product, Products } from '../../types/types';
import { Card } from '../card/card';

type CardsProps = {
  products: Products;
};

export function CardsList(props: CardsProps): JSX.Element {
  const { products } = props;
  return (
    <ul className="catalog-cards__list">
      {products.map((product: Product, index) => (
        <Card product={product} index={index} />
      ))}
    </ul>
  );
}
