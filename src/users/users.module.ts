import { Module } from '@nestjs/common';
import Dbservice from 'src/dbservice/db.service';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService, Dbservice],
  exports:[UsersService]
})
export class UsersModule {}
