import { Route } from '@server/helpers';
import passport from 'passport';

const testRoute: Route = {
  method: 'get',
  path: '/test',
  handlers: [
    // passport.authenticate('jwt', { session: false }),
    passport.authenticate(['jwt', 'local'], { session: false }),
    (req, res) => {
      res.json({ user: req.user, test: true });
    },
  ],
};

export default testRoute;
