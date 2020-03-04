import { Route } from '@server/helpers';
import registerRoute from './register.route';
import loginRoute from './login.route';
import logoutRoute from './logout';

const authRoute: Route = {
  path: '/auth',
  routes: [registerRoute, loginRoute, logoutRoute],
};

export default authRoute;
