import { Injectable } from "@nestjs/common";
import Dbservice from "src/dbservice/db.service";
import SalvarSenha from "src/dtos/salvar-senha.dtos";
import UserDtos from "src/dtos/user.dtos";
import UtilsUsers from "src/utils/utils-users";



@Injectable()
export default class RepositoriesUesrs {
    constructor(
        private readonly utilsUser: UtilsUsers,
        private readonly dbService: Dbservice) { }

    async createUser(user: UserDtos) {
        try {
            const con = await this.dbService.db();
            const bcrypt = await this.utilsUser.passwordBCrypt(user);
            const bind = [
                user.cnameuser,
                user.cemailuser,
                bcrypt
            ]
            const sql = `insert into admin.users(cnameuser, cemailuser, password)VALUES(:cnameuser, :cemailuser, :password)`;
            const sqlResult = await con.execute(sql, bind, { autoCommit: true });
            if (sqlResult.rowsAffected) return sqlResult;
        } catch (error) {
            console.log(error);
        }
    }

    async updateSenha(email: string, salvarSenha: SalvarSenha) {
        try {
            /* encrypt senha */
            const con = await this.dbService.db();
            const password = await this.utilsUser.updatePassword(salvarSenha);

            const bind = [email, password];
            const sqlupdate = `update admin.users set password= :password where cemailuser= :email`;
            const sqlupdatResult = await con.execute(sqlupdate, bind, { autoCommit: true });
                return {
                    status:true,
                    message:'Senha atualizada com sucesso!'
                }
        } catch (error) {
            console.log(error);
        }
    }
}