import { Route } from '@server/helpers';
import html from './html';

const clientRoute: Route = {
  path: '*',
  method: 'get',
  handlers: [
    async (req, res, next) => {
      try {
        res.send(await html({ req, res }));
      } catch (error) {
        next(error);
      }
    },
  ],
};

export default clientRoute;
