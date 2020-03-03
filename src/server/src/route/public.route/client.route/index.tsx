import { Route, Middleware } from '@server/helpers';
import view from '@server/view';
import routes from '@client/pages';

const renderViewMiddleWare: Middleware = async (req, res, next) => {
  try {
    res.send(await view({ req, res }));
  } catch (error) {
    next(error);
  }
};

const clientRoute: Route = {
  routes: [
    {
      path: routes.map(route => route.path).filter(path => path) as string[],
      method: 'get',
      handlers: renderViewMiddleWare,
    },
    {
      path: '*',
      method: 'get',
      handlers: [
        (req, res, next) => {
          res.statusCode = 404;
          next();
        },
        renderViewMiddleWare,
      ],
    },
  ],
};

export default clientRoute;
