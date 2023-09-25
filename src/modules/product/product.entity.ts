import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
} from '@typegoose/typegoose';
import { GuitarType } from '../../types/guitar-type.enum.js';
import { PRODUCT_VALIDATION } from './product.constant.js';

const { TITLE, DESCRIPTION, ARTICLE, PRICE, PHOTO } = PRODUCT_VALIDATION;

export interface ProductEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'products',
  },
})
export class ProductEntity extends defaultClasses.TimeStamps {
  @prop({
    minlength: TITLE.Min,
    maxlength: TITLE.Max,
    required: true,
  })
  public title!: string;

  @prop({
    minlength: DESCRIPTION.Min,
    maxlength: DESCRIPTION.Max,
    required: true,
  })
  public description!: string;

  @prop({
    required: true,
    default: new Date(),
  })
  public postDate!: Date;

  @prop({
    match: [/^[\w-]+\.(jpg|png)$/i, PHOTO.MessageValid],
    required: true,
    default: '',
  })
  public photo!: string;

  @prop({
    required: true,
    type: () => String,
    enum: GuitarType,
  })
  public guitarType!: string;

  @prop({ required: true, minlength: ARTICLE.Min, maxlength: ARTICLE.Max })
  public article!: string;

  @prop({ required: true })
  public stringCount!: number;

  @prop({ required: true, min: PRICE.Min, max: PRICE.Max })
  public price!: number;
}

export const ProductModel = getModelForClass(ProductEntity);
