import dayjs from 'dayjs';
import { ProductGeneratorInterface } from './product-generator.interface.js';
import { MockData } from '../../types/mock-data.type.js';
import {
  generateRandomValue,
  getRandomItem,
} from '../../core/helpers/index.js';
import { GuitarType } from '../../types/guitar-type.enum.js';
import { nanoid } from 'nanoid';
import { StringsCount } from '../../types/strings-count.enum.js';

const MIN_PRICE = 100;
const MAX_PRICE = 1000000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export default class ProductGenerator implements ProductGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const id = nanoid(5);
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const photo = getRandomItem<string>(this.mockData.photos);
    const guitarType = getRandomItem([
      GuitarType.Electric,
      GuitarType.Acoustic,
      GuitarType.Ukulele,
    ]);
    const article = nanoid(4);
    const stringCount = getRandomItem([
      StringsCount.four,
      StringsCount.six,
      StringsCount.seven,
      StringsCount.twelve,
    ]);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const addedDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    return [
      id,
      title,
      description,
      addedDate,
      photo,
      guitarType,
      article,
      stringCount,
      price,
    ].join('\t');
  }
}
