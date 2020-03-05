import { Route } from '@server/helpers';
import passport from 'passport';
import { createToken } from '@server/utils/token.util';
import UserModel from '@server/database/models/user.model';

const googleRoute: Route = {
  routes: [
    {
      path: '/google',
      method: 'get',
      handler: passport.authenticate('google', {
        scope: ['profile', 'email'],
      }),
    },
    {
      path: '/google/callback',
      method: 'get',
      middlewares: [passport.authenticate('google', { failureRedirect: '/login' })],
      handler: (req, res) => {
        // const user = req.user as UserModel;

        // req.user = { id: user.id, token: createToken(user.id, '1 day'), username: user.username };

        res.status(200).redirect('/');
      },
    },
  ],
};

export default googleRoute;
