import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { ProductServiceInterface } from './product-service.interface.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { ProductEntity } from './product.entity.js';
import { ProductQuery } from '../../types/product-query.type.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PRODUCT_DEFAULT } from './product.constant.js';
import { DECIMAL_SYSTEM, DEFAULT_STATIC_IMAGES } from '../../constant.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';

@injectable()
export class ProductService implements ProductServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface)
    private readonly logger: LoggerInterface,
    @inject(AppComponent.ProductModel)
    private readonly productModel: types.ModelType<ProductEntity>
  ) {}

  public async exists(productId: string): Promise<boolean> {
    return (await this.productModel.exists({ _id: productId })) !== null;
  }

  public async create(
    dto: CreateProductDto
  ): Promise<DocumentType<ProductEntity>> {
    const result = await this.productModel.create({
      ...dto,
      photo: DEFAULT_STATIC_IMAGES[0],
    });
    this.logger.info(`New product created: ${dto.title}`);

    return result;
  }

  public async findById(
    id: string
  ): Promise<types.DocumentType<ProductEntity> | null> {
    return this.productModel.findOne({ _id: id }).exec();
  }

  public async find(
    query: ProductQuery
  ): Promise<types.DocumentType<ProductEntity>[]> {
    const pipeline: any[] = [];

    if (query.guitarType) {
      pipeline.push({ $match: { guitarType: query.guitarType } });
    }
    if (query.stringCount) {
      const count = Number.parseInt(query.stringCount, DECIMAL_SYSTEM);
      pipeline.push({ $match: { stringCount: count } });
    }

    const sort = {
      [query.sortField || PRODUCT_DEFAULT.SORT_FIELD]:
        query.sortDirection || PRODUCT_DEFAULT.SORT_DIR,
    };
    pipeline.push({
      $sort: sort,
    });

    const limit = query.limit
      ? Number.parseInt(query.limit, DECIMAL_SYSTEM)
      : PRODUCT_DEFAULT.PAGE_SIZE;
    const page = query.page ? Number.parseInt(query.page, DECIMAL_SYSTEM) : 1;

    const skip = (page - 1) * limit;
    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: limit });

    return this.productModel.aggregate(pipeline).exec();
  }

  public async updateById(
    productId: string,
    dto: UpdateProductDto
  ): Promise<types.DocumentType<ProductEntity> | null> {
    return this.productModel
      .findByIdAndUpdate(productId, dto, { new: true })
      .exec();
  }

  public async deleteById(
    productId: string
  ): Promise<types.DocumentType<ProductEntity> | null> {
    return this.productModel.findByIdAndDelete(productId).exec();
  }
}
