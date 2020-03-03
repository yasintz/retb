import DatabaseContext from './database.context';

export type ServerContextType = typeof ServerContext;

const ServerContext = {
  DatabaseContext: new DatabaseContext(),
  TOKEN_SECRET_KEY: process.env.TOKEN_SECRET_KEY as string,
  PASSWORD_SECRET_KEY: process.env.PASSWORD_SECRET_KEY as string,
  SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY as string,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
};

export default ServerContext;
