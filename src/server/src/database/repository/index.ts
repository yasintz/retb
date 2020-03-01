import UserRepository from './user.repository';
import Models from '../models';

const Repositories = {
  UserRepository: new UserRepository(Models.UserModel),
};

export default Repositories;
