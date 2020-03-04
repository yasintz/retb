import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import express from 'express';
import passport from 'passport';
import route from '@server/route';
import applyErrorHandlers from '@server/middleware/error-handler';
import initDatabase from '@server/database';
import ServerContext from '@server/context';
import { Connection } from 'typeorm';
import passportService from './services/passport.service';

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    callback(null, true);
  },
};

class App {
  express: express.Express;

  database: Promise<Connection>;

  constructor() {
    this.createExpress();
    this.connectToDatabase();
    passportService.useAll();
    this.loadExpressConfiguration();
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

  private loadExpressConfiguration = () => {
    this.express
      .disable('x-powered-by')
      // eslint-disable-next-line
      .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
      .use(express.json({ limit: '50mb' }))
      .use(express.urlencoded({ limit: '50mb', extended: false }))
      .use(cors(corsOptions))
      .use(
        session({
          secret: ServerContext.SESSION_SECRET_KEY,
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
    route(this.express);
  };

  private applyErrorHandler = () => {
    applyErrorHandlers(this.express);
  };
}

export default new App();
