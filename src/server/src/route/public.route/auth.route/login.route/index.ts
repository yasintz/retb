import { Route } from '@server/helpers';
import localRoute from './local.route';
import googleRoute from './google.route';

const loginRoute: Route = { routes: [googleRoute, localRoute], path: '/login' };

export default loginRoute;
