import passport from '@server/services/passport';
import { checkAuthBodyMiddleware } from '@server/middleware';
import { Route } from '@server/helpers';
import registerRoute from './register.route';

const authRoute: Route[] = [
  registerRoute,
  {
    method: 'post',
    path: '/login',
    handler: [
      checkAuthBodyMiddleware,
      passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }),
    ],
  },
];

export default authRoute;
