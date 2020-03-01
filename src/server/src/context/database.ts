import UserService from '@server/services/database/user.service';
import Repositories from '@server/database/repository';

export interface DatabaseContext {
  UserService: UserService;
}

const databaseContext: DatabaseContext = {
  UserService: new UserService(Repositories.UserRepository),
};

export default databaseContext;
