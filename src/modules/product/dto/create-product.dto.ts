import { GuitarType } from '../../../types/guitar-type.enum.js';
import { IsEnum, IsInt, IsString, Length } from 'class-validator';
import { PRODUCT_VALIDATION } from '../product.constant.js';

const { TITLE, DESCRIPTION, ARTICLE, PRICE, GUITAR_TYPE } = PRODUCT_VALIDATION;

export class CreateProductDto {
  @IsString({ message: TITLE.MessageRequired })
  @Length(TITLE.Min, TITLE.Max, { message: TITLE.MessageValid })
  public title!: string;

  @IsString({ message: DESCRIPTION.MessageRequired })
  @Length(DESCRIPTION.Min, DESCRIPTION.Max, {
    message: DESCRIPTION.MessageValid,
  })
  public description!: string;

  @IsEnum(GuitarType, { message: GUITAR_TYPE.MessageValid })
  public guitarType!: GuitarType;

  @IsString({ message: ARTICLE.MessageRequired })
  @Length(ARTICLE.Min, ARTICLE.Max, { message: ARTICLE.MessageValid })
  public article!: string;

  public stringCount!: number;

  @IsInt({ message: PRICE.MessageValid })
  public price!: number;
}
