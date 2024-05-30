import { type RowDataPacket } from "mysql2";

import dbConnectionPool from "../config/database";
import { type NewUserType, type UserType } from "../types/user-types";

export class UserModel {
  async addUser(newUser: NewUserType) {
    try {
      await dbConnectionPool.query("CALL addUser(?,?)", [
        newUser.email,
        newUser.hashed_password,
      ]);

      const newUserDataInDb = await this.loadSingleUserByEmail(newUser.email);
      if (!newUserDataInDb) {
        throw new Error(
          "An error occurred while inserting user to the database."
        );
      }

      return newUserDataInDb;
    } catch (error: any) {
      let errorMessage = `An error occurred while inserting ${newUser.email} into the database.`;
      if (error.message.startsWith("Duplicate entry")) {
        errorMessage = `The email ${newUser.email} is already taken.`;
      }
      console.error(errorMessage, error);
      throw new Error(errorMessage);
    }
  }

  async loadSingleUserByEmail(email: UserType["email"]) {
    try {
      const [queryResult] = await dbConnectionPool.query<RowDataPacket[]>(
        "CALL loadSingleUserByEmail(?)",
        [email]
      );

      const userRows = queryResult[0] as RowDataPacket[];
      if (!userRows || userRows.length === 0) {
        return null;
      }

      return userRows[0] as UserType;
    } catch (error) {
      const errorMessage = `Error loading user with email ${email} by id.`;
      console.error(errorMessage, error);
      throw new Error(errorMessage);
    }
  }

  async loadSingleUserById(user_id: UserType["user_id"]) {
    try {
      const [queryResult] = await dbConnectionPool.query<RowDataPacket[]>(
        "CALL loadSingleUserById(?)",
        [user_id]
      );

      const userRows = queryResult[0] as RowDataPacket[];
      if (!userRows || userRows.length === 0) {
        return null;
      }

      return userRows[0] as UserType;
    } catch (error) {
      const errorMessage = `Error loading user with id ${user_id} by id.`;
      console.error(errorMessage, error);
      throw new Error(errorMessage);
    }
  }
}
