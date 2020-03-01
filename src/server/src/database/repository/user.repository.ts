import { Repository } from '@server/helpers';
import UserModel from '../models/user.model';

type SaveParameters = {
  id: string;
  username: string;
  password: string;
};

class UserRepository extends Repository<typeof UserModel> {
  create = ({ id, password, username }: SaveParameters) => {
    return this.Model.create({ id, username, password }).save();
  };

  getByUsername = (username: string) => this.Model.findOne({ where: { username } });
}

export default UserRepository;
