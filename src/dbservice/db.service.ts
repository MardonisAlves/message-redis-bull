
import { Injectable } from '@nestjs/common';
import * as oracle from 'oracledb';
@Injectable()
export default class Dbservice{

    async db(){
        try {
        return  await oracle.getConnection({
            user:process.env.USER,
            password:process.env.PASSWORD,
            connectionString: process.env.HOST
        });
         
        } catch (error) {
         console.log(error);
            
        }
    }
}