import { Route } from '@server/helpers';
import registerRoute from './register.route';
import loginRoute from './login.route';

const authRoute: Route = {
  path: '/auth',
  routes: [registerRoute, loginRoute],
};

export default authRoute;
