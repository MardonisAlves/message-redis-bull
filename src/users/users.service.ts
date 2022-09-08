import { Injectable } from '@nestjs/common';
import Dbservice from 'src/dbservice/db.service';
import UserDtos from 'src/dtos/user.dtos';
import { authUsers } from './../iterfaces/auth-user.interface';
@Injectable()
export class UsersService {
  constructor(private dbService:Dbservice){}
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

      async createUser(user:UserDtos){
        try {
          const con = await this.dbService.db()
          const bind = [user.cnameuser, user.cemailuser, user.password]
          const sql = `insert into admin.users(cnameuser, cemailuser, password) VALUES(:cnameuser, :cemailuser, :password)`;
          const sqlResult = await con.execute(sql, bind,{autoCommit:true}); 
          
          
        } catch (error) {
          console.log(error);
        }
      }
}
