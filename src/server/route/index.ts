import * as express from 'express';
import { ServerContext, Route } from '../helpers';
import authRoute from './auth';
import client from './client';
import helloRoute from './hello';

interface ServerProps {
  apiRouter: express.Router;
  baseRouter: express.Router;
  serverContext: ServerContext;
  server: express.Router;
}

export function applyRoutes(routes: Route[], router: express.Router, ctx: ServerContext): void {
  routes.forEach(({ handler, method, path }) => {
    const handlers = handler.map(
      item => async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
          item(req, res, next, ctx);
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

export default ({ apiRouter, baseRouter, serverContext, server }: ServerProps) => {
  applyRoutes([client], server, serverContext);

  applyRoutes([...authRoute, helloRoute], baseRouter, serverContext);

  applyRoutes([], apiRouter, serverContext);
};
