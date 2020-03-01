import { Route } from '@server/helpers';
import { checkAuthBodyMiddleware } from '@server/middleware';

const registerRoute: Route = {
  method: 'post',
  path: '/register',
  handler: [
    checkAuthBodyMiddleware,
    async (req, res, next) => {
      res.json({ typ: 'register' });
      // const hasUser = await serverContext.databaseContext.UserRepository.hasUsername(req.body.username);
      // if (hasUser) {
      //   throw new HTTP400Error('Username Daha once kayit edilmis');
      // }
      // const newUser = await db.User.save(req.body.username, req.body.password);
      // res.send(lodash.omit(newUser, 'password'));
    },
  ],
};

export default registerRoute;
