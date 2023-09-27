import { SortDirection } from '../../types/sortDirection.js';

export const PRODUCT_DEFAULT = {
  PAGE_SIZE: 7,
  SORT_FIELD: 'price',
  SORT_DIR: SortDirection.Asc,
};

export const PRODUCT_VALIDATION = {
  TITLE: {
    MessageValid: 'Заголовок должен состоять из 10-100 символов',
    MessageRequired: 'Заголовок обязателен',
    Min: 10,
    Max: 100,
  },
  DESCRIPTION: {
    MessageValid: 'Описание должно состоять из 20-1024 символов',
    MessageRequired: 'Описание обязательно',
    Min: 20,
    Max: 1024,
  },
  ARTICLE: {
    MessageValid: 'Артикул должен состоять из 5-40 символов',
    MessageRequired: 'Артикул обязателен',
    Min: 5,
    Max: 40,
  },
  PRICE: {
    MessageValid: 'Цена должна быть в пределах 100 - 1 000 000',
    MessageRequired: 'Цена обязательна',
    Min: 100,
    Max: 1000000,
  },
  PHOTO: {
    MessageValid: 'Фото должно быть в формате jpeg или png',
  },
  GUITAR_TYPE: {
    MessageValid: 'Один вариант из списка: электро, аккустика, укулеле',
  },
};
