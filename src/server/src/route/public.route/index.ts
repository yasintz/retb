import { Route } from '@server/helpers';
import clientRoute from './client.route';
import authRoute from './auth.route';

const publicRoute: Route = {
  routes: [authRoute, clientRoute],
};

export default publicRoute;
