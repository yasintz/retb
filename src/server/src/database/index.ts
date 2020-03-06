import 'reflect-metadata';
import { createConnection } from 'typeorm';
import Models from './models';

function initDatabase() {
  return createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: Object.values(Models),
    synchronize: true,
  }).catch(error => {
    console.error(error); // eslint-disable-line no-console
    process.exit(1);
  });
}

export default initDatabase;
