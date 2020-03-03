import { Route } from '@server/helpers';
import { HTTP404Error } from '@server/helpers/http-errors';
import { authenticationMiddleware } from '@server/middleware';
import testRoute from './test.route';

const notFoundError: Route = {
  path: '*',
  method: 'get',
  handlers: [
    (req, res) => {
      throw new HTTP404Error('Not Found');
    },
  ],
};

const apiRoute: Route = {
  path: '/api',
  routes: [testRoute, notFoundError],
  handlers: authenticationMiddleware,
};

export default apiRoute;
