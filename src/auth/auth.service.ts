import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { authUsers } from '../interfaces/auth-user.interface';
import { UsersService } from 'src/users/users.service';
import { ResultAuth } from 'src/interfaces/result-auth';
import UtilsUsers from 'src/utils/utils-users';

@Injectable()
export class AuthService {
    constructor(
        private userservice:UsersService,
        private jwtservice: JwtService,
        private utilsUsers:UtilsUsers
        ){}

    async validateUser(username:string, pass:string):Promise<ResultAuth | any>{
        const user:ResultAuth = await this.userservice.findOne(username);
        if(!user){
            throw new HttpException('User não encontrado',HttpStatus.UNAUTHORIZED)
        }
        if(await this.utilsUsers.comparePassword(pass , user.PASSWORD)){
            const {PASSWORD, ...result}:any = user;
            return result;
        }else{
            return false;
        }
    }

    async login(user:authUsers):Promise<ResultAuth | any>{
        const userValidate:ResultAuth = await this.validateUser(user.username, user.password);
        if(!userValidate){
             throw new HttpException('user not found',HttpStatus.UNAUTHORIZED)
        } 
        const payload = {username: userValidate.CNAMEUSER , sub: userValidate.NUSER}
        return {
            access_token: this.jwtservice.sign(payload)
        }
    }
}
