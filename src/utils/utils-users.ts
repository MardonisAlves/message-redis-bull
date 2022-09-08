import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import UserDtos from 'src/dtos/user.dtos';

@Injectable()
export default class UtilsUsers{
    
    async passwordBCrypt(user:UserDtos){
        try {
            const password = user.password;
            const hash = await bcrypt.hash(password, 10);
            return hash;
        } catch (error) {
           console.log(error);
        }
    }

    async comparePassword(user:UserDtos, hash:string){
        try {
            const isMatch = await bcrypt.compare(user.password, hash); 
            return isMatch;
        } catch (error) {
           console.log(error);    
        }
    }
}