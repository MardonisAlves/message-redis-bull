import { Injectable } from '@nestjs/common';
import UserDtos from 'src/dtos/user.dtos';
import RepositoriesUesrs from 'src/repositories/repositories-users';
import { authUsers } from './../iterfaces/auth-user.interface';
@Injectable()
export class UsersService {
    constructor(private readonly repositoriesUsers:RepositoriesUesrs){}
    private readonly users = [
        {
          userId: 1,
          username: 'mardonisgp@gmail.com',
          password: 'k8yup02@',
        },
        {
          userId: 2,
          username: 'maria',
          password: 'guess',
        },
      ];
    
      async findOne(username: string): Promise<authUsers | undefined> {
        /* select user do banco */
        return this.users.find(user => user.username === username);
      }

      async createUser(user:UserDtos){
        try {
        const createUser = await this.repositoriesUsers.createUser(user);
        return createUser;
        } catch (error) {
          console.log(error);
        }
      }
}
