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
import ProductGenerator from '../../modules/product-generator/product-generator.js';
import got from 'got';
import { MockData } from '../../types/mock-data.type.js';
import { DECIMAL_SYSTEM } from '../../constant.js';
import TSVFileWriter from '../file-writer/tsv-file-writer.js';

const DEFAULT_MOCK_DATA_FILEPATH = 'http://localhost:3123/api';
const DEFAULT_CSV_FILEPATH = './mocks/temp_products.csv';
const DEFAULT_ADMIN_USER = {
  name: 'admin',
  password: 'admin',
  email: 'admin@admin.com',
};

export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private userService!: UserServiceInterface;
  private productService!: ProductServiceInterface;
  private databaseService!: DatabaseClientInterface;
  private logger: LoggerInterface;
  private salt!: string;
  private countProduct!: number;

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
    countProduct: string,
    login: string,
    password: string,
    host: string,
    port: string,
    dbname: string,
    salt: string
  ): Promise<void> {
    const uri = getMongoURI(login, password, host, port, dbname);
    this.salt = salt;
    this.countProduct = Number.parseInt(countProduct, DECIMAL_SYSTEM);

    const initialData: MockData = await got
      .get(DEFAULT_MOCK_DATA_FILEPATH)
      .json();

    const productGeneratorString = new ProductGenerator(initialData);
    const tsvFileWriter = new TSVFileWriter(DEFAULT_CSV_FILEPATH);

    for (let i = 0; i < this.countProduct; i++) {
      await tsvFileWriter.write(productGeneratorString.generate());
    }

    await this.databaseService.connect(uri);

    const fileReader = new TSVFileReader(DEFAULT_CSV_FILEPATH);

    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    } catch (err) {
      console.log(`Can't read the file: ${getErrorMessage(err)}`);
      console.log(`
        Программа для подготовки данных для REST API сервера.
        Пример:
            main.js --<command> [--arguments]
        Команды:
            --version:                   # выводит номер версии
            --help:                      # печатает этот текст
            --generate <n> <connection string>  # генерирует и заполняет БД произвольное количество
                                                  тестовых данных
        Пример: npm run ts ./src/main.cli.ts -- --generate 100 admin test localhost 27017 guitar-shop secret
        `);
    }
  }
}
