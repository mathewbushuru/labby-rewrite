import dbConnectionPool from "../config/database";
import { NewUserType } from "../types/user-types";

export class UserModel {
  async insertUser(newUser: NewUserType) {
    try {
      const response = await dbConnectionPool.query("CALL addUser(?,?,?)", [
        newUser.user_id,
        newUser.email,
        newUser.password,
      ]);
      //TODO: Insert user error handling
      // throw new Error("database error");
      console.log(response[0]);
    } catch (error) {
      console.error("[user-model:insertUser]");
      console.error(error);
      return {errorMessage: "An error occurred while inserting user to the database."}
    }
  }
}
