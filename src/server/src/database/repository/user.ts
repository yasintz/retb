import UserTable from '../models/user';

type SaveParameters = {
  id: string;
  username: string;
  password: string;
};

class UserRepository {
  create = ({ id, password, username }: SaveParameters) => {
    return UserTable.create({ id, username, password }).save();
  };
}

export default UserRepository;
