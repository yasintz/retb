import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { ServerContext } from './helpers';
import Json from './database/models/json';
import User from './database/models/user';
import JsonUser from './database/models/user-json';
import route from './route';
import applyMiddleware from './middleware';
import applyErrorHandlers from './middleware/error-handler';
import initDatabase from './database';

function app() {
  console.log('Connecting Database'); // eslint-disable-line no-console
  const database = initDatabase();
  database.then(() => {
    console.log('Connected Database'); // eslint-disable-line no-console
  });

  const server = express();

  const apiRouter = express.Router();
  const baseRouter = express.Router();

  const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
      callback(null, true);
    },
  };

  const serverContext: ServerContext = {
    db: {
      Json,
      User,
      JsonUser,
    },
    JWT_SECRET: process.env.JWT_SECRET as string,
  };

  server
    .disable('x-powered-by')
    // eslint-disable-next-line
    .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
    .use(express.json({ limit: '50mb' }))
    .use(express.urlencoded({ limit: '50mb', extended: false }))
    .use(cors(corsOptions))
    .use(bodyParser.json());

  applyMiddleware(server, serverContext);

  server.use('/api', apiRouter);
  server.use('/', baseRouter);

  route({
    apiRouter,
    baseRouter,
    serverContext,
    server,
  });
  applyErrorHandlers(server);

  return { server, database };
}

export default app;
