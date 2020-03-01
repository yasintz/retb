import * as express from 'express';
import apiRoutes from './api.routes';
import publicRoutes from './public.routes';
import { Route } from '../helpers';

interface ServerProps {
  apiRouter: express.Router;
  publicRouter: express.Router;
}

export function applyRoutes(routes: Route[], router: express.Router): void {
  routes.forEach(({ handler, method, path }) => {
    const handlers = handler.map(
      item => async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
          item(req, res, next);
        } catch (error) {
          next(error);
        }
      },
    );

    if (handlers.length) {
      router[method](path, ...handlers);
    }
  });
}

export default ({ apiRouter, publicRouter }: ServerProps) => {
  applyRoutes(publicRoutes, publicRouter);
  applyRoutes(apiRoutes, apiRouter);
};
