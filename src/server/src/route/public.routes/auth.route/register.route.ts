import _ from 'lodash';
import { Route } from '@server/helpers';
import { checkAuthBodyMiddleware } from '@server/middleware';
import ServerContext from '@server/context';
import { HTTP400Error } from '@server/helpers/http-errors';

const registerRoute: Route = {
  method: 'post',
  path: '/register',
  handlers: [
    checkAuthBodyMiddleware,
    async (req, res, next) => {
      const hasUser = await ServerContext.DatabaseContext.UserService.hasUserByName(req.body.username);
      if (hasUser) {
        throw new HTTP400Error('Username Daha once kayit edilmis');
      }
      const newUser = await ServerContext.DatabaseContext.UserService.create(req.body.username, req.body.password);
      res.send(_.omit(newUser, 'password'));
    },
  ],
};

export default registerRoute;
