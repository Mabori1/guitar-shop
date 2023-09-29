import { GuitarType, Product, Products } from '../types/types';

const data = {
  data: {
    titles: [
      'Ditson 000-10 (ель/красное дерево)',
      'Ovation CS24-5 Celebrity Standard Mid Cutaway Black',
      'Fernandes LE-1Z 3S Black',
      'Cort GB24JJ-2T GB Series',
      'Cort 5-и струнная Action-DLX-V-AS-OPN Action Series',
    ],
    descriptions: [
      'Это фолк, который подойдет начинающему фингерстайл гитаристу.',
      'Звук очень разборчивый и подходит для мелодий: фингерстайл, переборы или игра медиатором.',
      'Сейчас эти гитары гораздо доступнее чем раньше.',
      'Если вы любите что-то необычное, что может выделиться из массы однообразного.',
      'Есть ощущение, что в руках история.',
      'Создавалась для известных музыкантов.',
    ],
    photos: [
      'g1.jpg',
      'g2.jpg',
      'g3.jpg',
      'g4.jpg',
      'g5.jpg',
      'g6.jpg',
      'g7.jpg',
      'g8.jpg',
      'g9.jpg',
      'g10.jpg',
    ],
    types: ['электро', 'аккустика', 'укулеле'],
  },
};

export function getProducts(count: number = 0): Products {
  const products: Products = [];

  for (let i = 0; i < count; i++) {
    const product: Product = {
      id: count.toString(10),
      addedDate: new Date(),
      guitarType: data.data.types[i % data.data.types.length] as GuitarType,
      article: 'dfsadfdadf',
      stringCount: 6,
      price: 17500,
      title: data.data.titles[i],
      description: data.data.descriptions[i],
      photo: 'img/content/catalog-product-1@2x.png 2x',
    };

    // @ts-ignore
    products.push(product);
  }

  return products;
}
