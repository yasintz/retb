import { Handler } from '../helpers';
import { HTTP400Error } from '../helpers/http-errors';

const authenticationMiddleware: Handler = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();

    return;
  }

  res.redirect('/');
};

const checkAuthBodyMiddleware: Handler = (req, res, next) => {
  if (!(req.body && req.body.username && req.body.password)) {
    throw new HTTP400Error('Missing username password');
  }

  next();
};

export { checkAuthBodyMiddleware, authenticationMiddleware };
