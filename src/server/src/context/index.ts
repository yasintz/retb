import databaseContext, { DatabaseContext } from './database';

export interface ServerContext {
  databaseContext: DatabaseContext;
  SECRET_KEY: string;
}

const serverContext: ServerContext = {
  databaseContext,
  SECRET_KEY: process.env.SECRET_KEY as string,
};

export default serverContext;
