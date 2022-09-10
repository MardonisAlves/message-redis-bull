import { Injectable } from "@nestjs/common";
import Dbservice from "./../dbservice/db.service";
import EmailDtos from "./..//dtos/email.dtos";

@Injectable()
export default class RepositoriesEmail{
  constructor(private readonly dbservice:Dbservice){}

async salvarEmail(data:EmailDtos){
    try {
    const con = await this.dbservice.db()
    const bind = [data.assunto, data.email, 1]
    const sql = `insert into admin.sendemail(assunto, email, statusenvio)VALUES(:assunto, :email, :statusenvio)`;
    const sqlResult = await con.execute(sql, bind,{autoCommit:true});

    return sqlResult
    } catch (error) {
      console.log(error);   
    }
}
}