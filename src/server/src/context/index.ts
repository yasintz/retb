import DatabaseContext from './database.context';

export interface ServerContextType {
  DatabaseContext: DatabaseContext;
  SECRET_KEY: string;
}

const ServerContext: ServerContextType = {
  DatabaseContext: new DatabaseContext(),
  SECRET_KEY: process.env.SECRET_KEY as string,
};

export default ServerContext;
