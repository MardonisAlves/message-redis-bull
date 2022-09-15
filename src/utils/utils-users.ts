import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import SalvarSenha from 'src/dtos/salvar-senha.dtos';
import UserDtos from 'src/dtos/user.dtos';
import { v4 as uuidv4 } from 'uuid';
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

    async comparePassword(password:string, hash:string){
        try {
            const isMatch = await bcrypt.compare(password, hash); 
            return isMatch;
        } catch (error) {
           console.log(error);    
        }
    }

    async updatePassword(salavarsenha:SalvarSenha){
        try {
            console.log(salavarsenha.password);
            
            const salt = await bcrypt.genSalt(100 , 'a');
            const hash = await bcrypt.hash(salavarsenha.password, salt);
            return hash;
        } catch (error) {
           console.log(error);
            
        }
    }
}