import { Middleware } from '@server/helpers';
import { HTTP400Error, HTTP401Error } from '@server/helpers/http-errors';

const authenticationMiddleware: Middleware = (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw new HTTP401Error('You Must Loggin');
  }

  next();
};

const checkAuthBodyMiddleware: Middleware = (req, res, next) => {
  if (!(req.body && req.body.username && req.body.password)) {
    throw new HTTP400Error('Missing username password');
  }

  next();
};

export { checkAuthBodyMiddleware, authenticationMiddleware };
