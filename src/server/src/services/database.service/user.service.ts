import md5 from 'md5';
import { uuid } from '@server/utils';
import { Service } from '@server/helpers';
import UserRepository from '@server/database/repository/user.repository';

class UserService extends Service<UserRepository> {
  create = (username: string, password: string) => {
    return this.Repository.create({
      id: uuid(),
      username,
      password: md5(password),
    });
  };

  hasUserByName = async (username: string): Promise<boolean> => {
    const user = await this.Repository.getByUsername(username);

    return Boolean(user);
  };
}

export default UserService;
