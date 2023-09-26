import { CliCommandInterface } from './cli-command.interface.js';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
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
