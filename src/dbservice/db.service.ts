
import { Injectable } from '@nestjs/common';
import * as oracle from 'oracledb';

@Injectable()
export default class Dbservice{

    async db(){
        try {
        const paracons = {
            user: process.env.ORACLE_USER.toString(),
            password: process.env.ORACLE_PASSWORD.toString(),
            connectionString: process.env.ORACLE_HOST.toString() 
        }
        const connection = await oracle.getConnection(paracons);
         return connection
         
        } catch (error) {
         console.log(error);
            
        }
    }
}