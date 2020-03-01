import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import express from 'express';
import passport from '@server/services/passport';
import route from '@server/route';
import applyErrorHandlers from '@server/middleware/error-handler';
import initDatabase from '@server/database';
import serverContext from '@server/context';

function app() {
  console.log('Connecting Database'); // eslint-disable-line no-console
  const database = initDatabase();
  database.then(() => {
    console.log('Connected Database'); // eslint-disable-line no-console
  });

  const server = express();

  const apiRouter = express.Router();
  const publicRouter = express.Router();

  const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
      callback(null, true);
    },
  };

  server
    .disable('x-powered-by')
    // eslint-disable-next-line
    .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
    .use(express.json({ limit: '50mb' }))
    .use(express.urlencoded({ limit: '50mb', extended: false }))
    .use(cors(corsOptions))
    .use(
      session({ secret: serverContext.SECRET_KEY, cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }),
    )

    .use(passport.initialize())
    .use(passport.session())
    .use(bodyParser.json());

  server.use('/api', apiRouter);
  server.use('/', publicRouter);

  route({
    apiRouter,
    publicRouter,
  });

  applyErrorHandlers(server);

  return { server, database };
}

export default app;
