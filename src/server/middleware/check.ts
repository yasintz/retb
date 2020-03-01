import { Handler } from '../helpers';
import { HTTP400Error, HTTP404Error } from '../helpers/http-errors';

const checkAuthBody: Handler = (req, res, next) => {
  try {
    if (req.body && req.body.username && req.body.password) {
      next();
    } else {
      throw new HTTP400Error('Missing username password');
    }
  } catch (error) {
    next(error);
  }
};

const checkUpdateUserBody: Handler = (req, res, next) => {
  try {
    if (req.body && (req.body.username || req.body.password)) {
      next();
    } else {
      throw new HTTP400Error('Missing username or password');
    }
  } catch (error) {
    next(error);
  }
};

const checkHasData: Handler = (req, res, next) => {
  try {
    if (req.body.data) {
      next();
    } else {
      throw new HTTP404Error('Json Not Found');
    }
  } catch (error) {
    next(error);
  }
};

export { checkAuthBody, checkUpdateUserBody, checkHasData };
