import dbConnectionPool from "../config/database";
import { NewUserType } from "../types/user-types";

export class UserModel {
  async insertUser(newUser: NewUserType) {
    const response = await dbConnectionPool.query("CALL addUser(?,?,?)", [
      newUser.user_id,
      newUser.email,
      newUser.password,
    ]);
  }
}
