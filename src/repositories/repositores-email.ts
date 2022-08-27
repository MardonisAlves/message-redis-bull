import { Injectable } from "@nestjs/common";
import Dbservice from "src/dbservice/db.service";
import EmailDtos from "src/dtos/email.dtos";

@Injectable()
export default class RepositoriesEmail{
  constructor(private readonly dbservice:Dbservice){}

async salvarEmail(data:EmailDtos){
    try {
    const con = await this.dbservice.db()
    const bind = {
      to:data.email,
      assunto:data.assunto,
      id_out:{
      }

    }
    const sql = `INSET INTO TABELA(to, assunto)VALUES(:to, :assunto) returning into :id_out`
    const sqlResult = await con.execute(sql, bind,{autoCommit:true});
    return sqlResult.outBinds
    } catch (error) {
      console.log(error);   
    }
}
}