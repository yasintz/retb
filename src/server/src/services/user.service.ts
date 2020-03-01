import md5 from 'md5';
import { uuid } from '@server/utils';
import serverContext from '../context';

class UserService {
  create = (username: string, password: string) => {
    return serverContext.databaseContext.UserRepository.create({
      id: uuid(),
      username,
      password: md5(password),
    });
  };
}

export default new UserService();
