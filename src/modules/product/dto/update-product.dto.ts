import { GuitarType } from '../../../types/guitar-type.enum.js';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { PRODUCT_VALIDATION } from '../product.constant.js';

const { TITLE, DESCRIPTION, ARTICLE, PHOTO, PRICE, GUITAR_TYPE } =
  PRODUCT_VALIDATION;

export class UpdateProductDto {
  @IsOptional()
  @IsString({ message: TITLE.MessageRequired })
  @Length(TITLE.Min, TITLE.Min, { message: TITLE.MessageValid })
  public title?: string;

  @IsOptional()
  @IsString({ message: DESCRIPTION.MessageRequired })
  @Length(DESCRIPTION.Min, DESCRIPTION.Max, {
    message: DESCRIPTION.MessageValid,
  })
  public description?: string;

  @IsOptional()
  @IsString({ message: DESCRIPTION.MessageRequired })
  @Matches(/\.(jpg|png)$/, { message: PHOTO.MessageValid })
  public photo?: string;

  @IsOptional()
  @IsEnum(GuitarType, { message: GUITAR_TYPE.MessageValid })
  public guitarType?: GuitarType;

  @IsOptional()
  @IsString({ message: ARTICLE.MessageRequired })
  @Length(ARTICLE.Min, ARTICLE.Min, { message: ARTICLE.MessageValid })
  public article?: string;

  @IsOptional()
  public stringCount?: number;

  @IsOptional()
  @IsInt({ message: PRICE.MessageRequired })
  @Min(PRICE.Min, { message: PRICE.MessageValid })
  @Max(PRICE.Max, { message: PRICE.MessageValid })
  public price?: number;
}
