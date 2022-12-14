import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as OracleDB from 'oracledb';
import Dbservice from 'src/dbservice/db.service';
import SalvarSenha from 'src/dtos/salvar-senha.dtos';
import UserDtos from 'src/dtos/user.dtos';
import { ResultAuth } from 'src/interfaces/result-auth';
import RepositoriesUesrs from 'src/repositories/repositories-users';

@Injectable()
export class UsersService {
 
    constructor(
      private readonly repositoriesUsers:RepositoriesUesrs,
      private readonly dbService:Dbservice,
      ){}
   
    
      async findOne(username: string): Promise<ResultAuth> {
        try {
          const con = await this.dbService.db();
          const bind = [username];
          const sql = `select * from admin.users where cemailuser= :username`;
          const sqlResult:any = await con.execute(sql, bind, {outFormat:OracleDB.OUT_FORMAT_OBJECT});
          await con.close();
          if(sqlResult.rows.length === 0){
             new HttpException('user not found',HttpStatus.UNAUTHORIZED)
          }else{
              const dataAuth:ResultAuth = {
              CNAMEUSER: sqlResult.rows[0].CNAMEUSER,
              CEMAILUSER: sqlResult.rows[0].CEMAILUSER,
              NUSER: sqlResult.rows[0].NUSER,
              PASSWORD: sqlResult.rows[0].PASSWORD
            }
            return dataAuth;
          }
        } catch (error) {
          console.log(error);
        }
      }

      async createUser(user:UserDtos):Promise<string | unknown>{
        try {
        const userExiste = await this.findOne(user.cemailuser);
        if(userExiste){
          return ({
            message:'Usuario ja esta cadastrado!'
          })
        }else{
          const createUser = await this.repositoriesUsers.createUser(user);
          return createUser;
        }
        } catch (error) {
          console.log(error);
        }
      }

      async recuperarSenha(email:string){
        try {
        const findEmail = await this.findOne(email);
        return findEmail;
        } catch (error) {
         console.log(error);
        }
      }

      async updateSenha(email:string, salvarSenha:SalvarSenha){
        try {
          const updatesenha = await this.repositoriesUsers.updateSenha(email, salvarSenha);
          return updatesenha;
        } catch (error) {
          console.log(error);
        }
      }
}
