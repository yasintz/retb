import 'reflect-metadata';
import ServerContext from '@server/context';
import { createConnection } from 'typeorm';
import Models from './models';

function initDatabase() {
  console.log('Connection Database'); // eslint-disable-line no-console

  return createConnection({
    type: 'postgres',
    url: ServerContext.Config.DATABASE_URL,
    entities: Object.values(Models),
    synchronize: true,
  })
    .then(connection => {
      console.log('Connected Database'); // eslint-disable-line no-console

      return connection;
    })
    .catch(error => {
      console.error(error); // eslint-disable-line no-console
      process.exit(1);
    });
}

export default initDatabase;
