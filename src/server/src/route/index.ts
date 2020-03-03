import * as express from 'express';
import { Route } from '@server/helpers';
import { uuid } from '@server/utils';

import apiRoute from './api.route';
import publicRoute from './public.route';
import applyRoutes from './apply-routes';

const serverRoute: Route = {
  routes: [apiRoute, publicRoute],
};

interface RR {
  id: string;
  path?: string;
  parentId: string;
  childs: RR[];
}
const lasts: RR[] = [];

function logRoutes(main: any, parentId: string): void {
  const id = uuid();
  const last = lasts[lasts.length - 1];
  if (last) {
    if (last.id === parentId) {
      const current: RR = { parentId, id, childs: [], path: main.path };
      last.childs.push(current);
      if (main.routes) {
        lasts.push(current);
        main.routes.forEach((element: any) => logRoutes(element, current.id));
      }
    } else {
      lasts.pop();
      logRoutes(main, parentId);
    }
  } else {
    lasts.push({ id: parentId, parentId: '', childs: [] });
    main.routes.forEach((element: any) => logRoutes(element, parentId));
  }
}

export default (server: express.Router) => {
  serverRoute.handlers = (req, res, next) => {
    process.nextTick(() => {
      lasts.length = 0;
      logRoutes(serverRoute, 'server');
      require('fs').writeFileSync('./oo.json')
    });
    next();
  };

  applyRoutes(serverRoute, server);
};
