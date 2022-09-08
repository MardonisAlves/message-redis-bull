import { Module } from '@nestjs/common';
import Dbservice from 'src/dbservice/db.service';
import RepositoriesUesrs from 'src/repositories/repositories-users';
import UtilsUsers from 'src/utils/utils-users';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService, Dbservice, RepositoriesUesrs, UtilsUsers],
  exports:[UsersService]
})
export class UsersModule {}
