import databaseContext, { DatabaseContext } from './database';

export interface ServerContextType {
  DatabaseContext: DatabaseContext;
  SECRET_KEY: string;
}

const ServerContext: ServerContextType = {
  DatabaseContext: databaseContext,
  SECRET_KEY: process.env.SECRET_KEY as string,
};

export default ServerContext;
