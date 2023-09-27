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
import HttpError from '../../core/errors/http-error.js';
import { UnknownRecord } from '../../types/unknown-Record.type.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { ValidateObjectIdMiddleware } from '../../core/middleware/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../core/middleware/validate-dto.middleware.js';
import { DocumentExistsMiddleware } from '../../core/middleware/document-exists.middleware.js';
import { UploadFileMiddleware } from '../../core/middleware/upload-file.middleware.js';
import { ConfigInterface } from '../../core/config/config.interface.js';
import { PrivateRouteMiddleware } from '../../core/middleware/private-route.middleware.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import { UploadPhotoRdo } from './rdo/upload-photo.rdo.js';

@injectable()
export default class ProductController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) logger: LoggerInterface,
    @inject(AppComponent.ProductServiceInterface)
    private readonly productService: ProductServiceInterface,
    @inject(AppComponent.ConfigInterface)
    configService: ConfigInterface<RestSchema>
  ) {
    super(logger, configService);

    this.logger.info('Register routes for ProductController…');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [new PrivateRouteMiddleware()],
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateProductDto),
      ],
    });
    this.addRoute({
      path: '/:productId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('productId'),
        new DocumentExistsMiddleware(
          this.productService,
          'Product',
          'productId'
        ),
      ],
    });
    this.addRoute({
      path: '/:productId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('productId'),
        new DocumentExistsMiddleware(
          this.productService,
          'Product',
          'productId'
        ),
        new ValidateDtoMiddleware(UpdateProductDto),
      ],
    });
    this.addRoute({
      path: '/:productId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('productId'),
        new DocumentExistsMiddleware(
          this.productService,
          'Product',
          'productId'
        ),
      ],
    });

    this.addRoute({
      path: '/:productId/photo',
      method: HttpMethod.Post,
      handler: this.uploadPhoto,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('productId'),
        new UploadFileMiddleware(
          this.configService.get('UPLOAD_DIRECTORY'),
          'photo'
        ),
      ],
    });
  }

  public async index(req: Request, res: Response): Promise<void> {
    const products = await this.productService.find(req.query);
    const productsToResponse = fillDTO(ProductShortRdo, products);
    this.ok(res, productsToResponse);
  }

  public async create(
    { body }: Request<UnknownRecord, UnknownRecord, CreateProductDto>,
    res: Response
  ): Promise<void> {
    const existProduct = await this.productService.findByTitle(body.title);

    if (existProduct) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Product with title «${body.title} exists.`,
        'ProductController'
      );
    }

    const result = await this.productService.create(body);
    this.created(res, fillDTO(ProductRdo, result));
  }

  public async show({ params }: Request, res: Response): Promise<void> {
    const product = await this.productService.findById(params.productId);

    this.ok(res, fillDTO(ProductRdo, product));
  }

  public async delete({ params }: Request, res: Response): Promise<void> {
    const deletedProduct = await this.productService.deleteById(
      params.productId
    );
    this.noContent(res, fillDTO(ProductRdo, deletedProduct));
  }

  public async update({ body, params }: Request, res: Response): Promise<void> {
    const updatedProduct = await this.productService.updateById(
      params.productId,
      body
    );
    this.ok(res, fillDTO(ProductRdo, updatedProduct));
  }

  public async uploadPhoto(req: Request, res: Response) {
    const { productId } = req.params;
    const updateDto = { photo: req.file?.filename };
    await this.productService.updateById(productId, updateDto);
    this.created(res, fillDTO(UploadPhotoRdo, { updateDto }));
  }
}
