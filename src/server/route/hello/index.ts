import { Route } from '~/server/helpers';

const helloRoute: Route = {
  path: '/hello',
  method: 'get',
  handler: [
    (req, res) => {
      res.json({ hello: true });
    },
  ],
};

export default helloRoute;
