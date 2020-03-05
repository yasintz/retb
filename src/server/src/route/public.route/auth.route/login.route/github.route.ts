import { Route } from '@server/helpers';
import passport from 'passport';

const githubRoute: Route = {
  routes: [
    {
      path: '/github',
      method: 'get',
      handler: passport.authenticate('github', { scope: ['profile', 'email', 'username'] }),
    },
    {
      path: '/github/callback',
      method: 'get',
      middlewares: [passport.authenticate('github', { failureRedirect: '/login' })],

      handler: (req, res) => {
        res.redirect('/');
      },
    },
  ],
};

export default githubRoute;
