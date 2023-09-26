import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { Controller } from '../../core/controller/controller.abstract.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { ProductServiceInterface } from './product-service.interface.js';
import { fillDTO } from '../../core/helpers/common.js';
import { ProductRdo } from './rdo/product.rdo.js';
import { ProductShortRdo } from './rdo/product-short.rdo.js';
import { StatusCodes } from 'http-status-codes';
import { CreateProductDto } from './dto/create-product.dto.js';

@injectable()
export default class ProductController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) logger: LoggerInterface,
    @inject(AppComponent.ProductServiceInterface)
    private readonly productService: ProductServiceInterface
  ) {
    super(logger);

    this.logger.info('Register routes for ProductController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
  }

  public async index(req: Request, res: Response): Promise<void> {
    const products = await this.productService.find(req.query);
    const productsToResopnse = fillDTO(ProductShortRdo, products);
    this.ok(res, productsToResopnse);
  }

  public async create(
    {
      body,
    }: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      CreateProductDto
    >,
    res: Response
  ): Promise<void> {
    const existProduct = await this.productService.findByTitle(body.title);

    if (existProduct) {
      const errorMessage = `Product with title «${body.title}» exists.`;
      this.send(res, StatusCodes.UNPROCESSABLE_ENTITY, { error: errorMessage });
      return this.logger.error(errorMessage);
    }

    const result = await this.productService.create(body);
    this.created(res, fillDTO(ProductRdo, result));
  }
}
