import { Injectable } from "@nestjs/common";
import Dbservice from "src/dbservice/db.service";
import UserDtos from "src/dtos/user.dtos";
import UtilsUsers from "src/utils/utils-users";



@Injectable()
export default class RepositoriesUesrs {
    constructor(
        private readonly utilsUser:UtilsUsers,
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
            if(sqlResult.rowsAffected) return sqlResult;
        } catch (error) {
            console.log(error);
        }
    }
}