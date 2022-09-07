import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { authUsers } from './../iterfaces/auth-user.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private userservice:UsersService,
        private jwtservice: JwtService
        ){}

    async validateUser(username:string, pass:string):Promise<any>{
        const user = await this.userservice.findOne(username);
        console.log(user);
        /* verificar o bycript */
        if(user.password === pass){
            const {password, ...result} = user;
            return result;
        }else{
            return null;
        }
    }

    async login(user:authUsers){
        const payload = {username: user.username , sub: user.userId}
        return {
            access_token: this.jwtservice.sign(payload)
        }
    }
}
