import * as express from 'express';
import { Route, ParentRoute, HandlerRoute } from '@server/helpers';

function isParentRoute(route: any): route is ParentRoute {
  return route.routes;
}

function isHandlerRoute(route: any): route is HandlerRoute {
  return route.method && route.handler && route.path;
}

function applyRoutes(route: Route, router: express.Router): void {
  if (isParentRoute(route)) {
    let newRouter = router;
    const path = route.path ? route.path : '/';
    const middlewares = route.middlewares ? route.middlewares : [];
    if ((middlewares && middlewares.length) || (path && path !== '/')) {
      newRouter = express.Router();
      router.use(path, ...middlewares, newRouter);
    }

    route.routes.forEach(childRote => applyRoutes(childRote, newRouter));

    return;
  }
  if (isHandlerRoute(route)) {
    const { handler, method, path, middlewares } = route;
    const handlers = [...(middlewares || []), handler].map(
      item => async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
          await item(req, res, next);
        } catch (error) {
          next(error);
        }
      },
    );
    if (handlers.length) {
      router[method](path, handlers);
    }

    return;
  }

  // eslint-disable-next-line no-console
  console.error(`Routes is incorrect`);
  process.exit(1);
}

export default applyRoutes;
