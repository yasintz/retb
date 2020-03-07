import config from '@server/config';
import DatabaseContext from './database.context';

export type ServerContextType = typeof ServerContext;

const ServerContext = {
  DatabaseContext: new DatabaseContext(),
  Config: config,
};

export default ServerContext;
