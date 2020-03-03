import { Route } from '@server/helpers';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { HTTP400Error } from '@server/helpers/http-errors';
import configurePassport from '@server/utils/passport.configure';
import ServerContext from '@server/context';

configurePassport(passport);

const localRoute: Route = {
  method: 'post',
  path: '/login',
  handlers: (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) {
        throw new HTTP400Error('User Not Found');
      }

      if (!user) {
        throw new HTTP400Error('Bad request');
      }

      req.logIn(user, error => {
        if (error) {
          throw new HTTP400Error('An error occured');
        }
        const token = jwt.sign({ id: user.id }, ServerContext.TOKEN_SECRET_KEY, { expiresIn: '1 day' });

        res.json({ token: `Bearer ${token}` });
      });
    })(req, res, next);
  },
};

export default localRoute;
