import { Route } from '@server/helpers';
import html from './html';

const clientRoute: Route = {
  path: '*',
  method: 'get',
  handler: [
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
