import UserRepository from '../database/repository/user';

export interface DatabaseContext {
  UserRepository: UserRepository;
}

const databaseContext: DatabaseContext = {
  UserRepository: new UserRepository(),
};

export default databaseContext;
