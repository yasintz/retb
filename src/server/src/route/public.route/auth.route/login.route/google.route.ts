import { Route } from '@server/helpers';
import passport from 'passport';

const googleRoute: Route = {
  routes: [
    {
      path: '/login/google',
      method: 'get',
      handlers: passport.authenticate('google', {
        scope: ['profile'],
      }),
    },
    {
      path: '/login/google/callback',
      method: 'get',
      handlers: passport.authenticate('google', { failureRedirect: '/login', successRedirect: '/' }),
    },
  ],
};

export default googleRoute;
