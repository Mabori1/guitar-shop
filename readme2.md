1. Запустить сервер: npm run mock:server
2. Импорт данных из файла: npm run ts ./src/main.cli.ts -- --import ./mocks/mock-data.tsv
3. Генерация данных в файл: npm run ts ./src/main.cli.ts -- --generate 100 ./mocks/mock-data2.tsv http://localhost:3123/ap
