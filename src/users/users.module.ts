import { Module } from '@nestjs/common';
import Dbservice from 'src/dbservice/db.service';
import RepositoriesUesrs from 'src/repositories/repositories-users';
import EmailService from 'src/services/email-service';
import UtilsUsers from 'src/utils/utils-users';
import { UsersService } from './users.service';

@Module({
  providers: [
    UsersService, 
    Dbservice, 
    RepositoriesUesrs,
    UtilsUsers
  ],
  exports:[UsersService, UtilsUsers]
})
export class UsersModule {}
