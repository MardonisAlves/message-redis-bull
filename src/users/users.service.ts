import { Injectable } from '@nestjs/common';
import { authUsers } from './../iterfaces/auth-user.interface';
@Injectable()
export class UsersService {
    /* Fazer a consulta no banc de dados*/
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
        return this.users.find(user => user.username === username);
      }
}
