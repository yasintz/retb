import { Route } from '@server/helpers';
import passport from 'passport';

const githubRoute: Route = {
  routes: [
    {
      path: '/github',
      method: 'get',
      handlers: passport.authenticate('github', { scope: ['profile', 'email', 'username'] }),
    },
    {
      path: '/github/callback',
      method: 'get',
      handlers: [
        passport.authenticate('github', { failureRedirect: '/login' }),
        (req, res) => {
          res.redirect('/');
        },
      ],
    },
  ],
};

export default githubRoute;
