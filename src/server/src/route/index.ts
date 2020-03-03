import * as express from 'express';
import { Route } from '@server/helpers';

import apiRoute from './api.route';
import publicRoute from './public.route';
import applyRoutes from './apply-routes';

const serverRoute: Route = {
  routes: [apiRoute, publicRoute],
};

export default (server: express.Router) => {
  applyRoutes(serverRoute, server);
};
