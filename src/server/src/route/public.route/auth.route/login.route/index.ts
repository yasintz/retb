import { Route } from '@server/helpers';
import localRoute from './local.route';
import googleRoute from './google.route';
import githubRoute from './github.route';

const loginRoute: Route = { routes: [googleRoute, githubRoute, localRoute], path: '/login' };

export default loginRoute;
