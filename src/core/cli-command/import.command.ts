import TSVFileReader from '../file-reader/tsv-file-reader.js';
import { CliCommandInterface } from './cli-command.interface.js';
import {
  createProduct,
  getErrorMessage,
  getMongoURI,
} from '../helpers/index.js';
import { UserServiceInterface } from '../../modules/user/user-service.interface.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import ConsoleLoggerService from '../logger/console.service.js';
import UserService from '../../modules/user/user.service.js';
import MongoClientService from '../database-client/mongo-client.service.js';
import { UserModel } from '../../modules/user/user.entity.js';
import { DatabaseClientInterface } from '../database-client/database-client.interface.js';
import { ProductServiceInterface } from '../../modules/product/product-service.interface.js';
import { ProductModel } from '../../modules/product/product.entity.js';
import { ProductService } from '../../modules/product/product-service.js';
import { Product } from '../../types/product.type.js';

const DEFAULT_DB_PORT = '27017';
const DEFAULT_ADMIN_USER = {
  name: 'admin',
  password: 'admin',
  email: 'admin@admin.com',
};

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private userService!: UserServiceInterface;
  private productService!: ProductServiceInterface;
  private databaseService!: DatabaseClientInterface;
  private logger: LoggerInterface;
  private salt!: string;

  constructor() {
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.logger = new ConsoleLoggerService();
    this.productService = new ProductService(this.logger, ProductModel);
    this.userService = new UserService(this.logger, UserModel);
    this.databaseService = new MongoClientService(this.logger);
  }

  private async saveProduct(product: Product) {
    await this.userService.findOrCreate(DEFAULT_ADMIN_USER, this.salt);

    await this.productService.create({
      ...product,
    });
  }

  private async onLine(line: string, resolve: () => void) {
    const product = createProduct(line);
    await this.saveProduct(product);
    resolve();
  }

  private onComplete(count: number) {
    console.log(`${count} rows imported.`);
    this.databaseService.disconnect();
  }

  public async execute(
    filename: string,
    login: string,
    password: string,
    host: string,
    dbname: string,
    salt: string
  ): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseService.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    } catch (err) {
      console.log(`Can't read the file: ${getErrorMessage(err)}`);
    }
  }
}
