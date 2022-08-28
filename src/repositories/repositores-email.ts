import { Injectable } from "@nestjs/common";
import Dbservice from "src/dbservice/db.service";
import EmailDtos from "src/dtos/email.dtos";

@Injectable()
export default class RepositoriesEmail{
  constructor(private readonly dbservice:Dbservice){}

async salvarEmail(data:EmailDtos){
    try {
    const con = await this.dbservice.db()
    const bind = [data.assunto, data.email]
    const sql = `insert into admin.sendemail VALUES(:1, :2)`;
    const sqlResult = await con.execute(sql, bind,{autoCommit:true});
    console.log(sqlResult);
    return sqlResult
    } catch (error) {
      console.log(error);   
    }
}
}