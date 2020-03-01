/* eslint-disable no-console,global-require */
import { Request, Response, NextFunction, Router, Express } from 'express';
import { HTTPClientError } from '../helpers/http-errors';

const handleClientErrors = (router: Router) => {
  router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof HTTPClientError) {
      console.error(`Client Error : ${err}`);
      res.status(err.statusCode).send(err.message);
    } else {
      next(err);
    }
  });
};

const handleServerErrors = (router: Router) => {
  router.use(async (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(`Server Error : ${err}`);
    if (process.env.NODE_ENV !== 'development') {
      res.redirect('/error');
    } else {
      res.status(500).send(err.stack);
    }
  });
};

export default (server: Express) => {
  handleClientErrors(server);
  handleServerErrors(server);
};
