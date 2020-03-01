import { Route } from '@server/helpers';
import passport from '@server/services/passport';
import { checkAuthBodyMiddleware } from '@server/middleware';

const loginRoute: Route = {
  method: 'post',
  path: '/login',
  handlers: [
    checkAuthBodyMiddleware,
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }),
  ],
};

export default loginRoute;
