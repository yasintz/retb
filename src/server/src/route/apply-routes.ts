import * as express from 'express';
import { Route, ParentRoute, ChildRoute } from '@server/helpers';

function isParent(route: any): route is ParentRoute {
  return route.routes;
}

function isChild(route: any): route is ChildRoute {
  return route.method && route.handlers && route.path;
}

function applyRoutes(route: Route, router: express.Router): void {
  if (isParent(route)) {
    const handlers = route.handlers ? (Array.isArray(route.handlers) ? route.handlers : [route.handlers]) : [];
    let newRouter = router;
    const path = route.path ? route.path : '/';
    if (handlers.length || (path && path !== '/')) {
      newRouter = express.Router();
      router.use(path, ...handlers, newRouter);
    }

    route.routes.forEach(childRote => applyRoutes(childRote, newRouter));

    return;
  }
  if (isChild(route)) {
    const { handlers: handler, method, path } = route;
    const handlerArray = Array.isArray(handler) ? handler : [handler];
    const handlers = handlerArray.map(
      item => async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
          item(req, res, next);
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
