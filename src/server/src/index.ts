import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import express from 'express';
import passport from '@server/services/passport';
import route from '@server/route';
import applyErrorHandlers from '@server/middleware/error-handler';
import initDatabase from '@server/database';
import ServerContext from '@server/context';
import { Connection } from 'typeorm';

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    callback(null, true);
  },
};

class App {
  express: express.Express;

  database: Promise<Connection>;

  private apiRouter: express.Router;

  private publicRouter: express.Router;

  constructor() {
    this.createExpress();
    this.connectToDatabase();
    this.loadHandlers();
    this.loadRouters();
    this.applyRoutes();
    this.applyErrorHandler();
  }

  private createExpress = () => {
    this.express = express();
  };

  private connectToDatabase = () => {
    console.log('Connecting Database'); // eslint-disable-line no-console
    this.database = initDatabase();
    this.database.then(() => {
      console.log('Connected Database'); // eslint-disable-line no-console
    });
  };

  private loadRouters = () => {
    this.apiRouter = express.Router();
    this.publicRouter = express.Router();

    this.express.use('/api', this.apiRouter);
    this.express.use('/', this.publicRouter);
  };

  private loadHandlers = () => {
    this.express
      .disable('x-powered-by')
      // eslint-disable-next-line
      .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
      .use(express.json({ limit: '50mb' }))
      .use(express.urlencoded({ limit: '50mb', extended: false }))
      .use(cors(corsOptions))
      .use(
        session({
          secret: ServerContext.SECRET_KEY,
          cookie: { maxAge: 60000 },
          resave: false,
          saveUninitialized: false,
        }),
      )
      .use(passport.initialize())
      .use(passport.session())
      .use(bodyParser.json());
  };

  private applyRoutes = () => {
    route({
      apiRouter: this.apiRouter,
      publicRouter: this.publicRouter,
    });
  };

  private applyErrorHandler = () => {
    applyErrorHandlers(this.express);
  };
}

export default new App();
