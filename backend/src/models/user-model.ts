import { type RowDataPacket } from "mysql2";

import db from "../config/database";
import { type NewUserType, type UserType } from "../types/user-types";

export class UserModel {
  async addUser(newUser: NewUserType) {
    try {
      await db.query("CALL addUser(?,?,?,?)", [
        newUser.email,
        newUser.hashedPassword,
        newUser.firstName,
        newUser.lastName,
      ]);

      const newUserDataInDb = await this.loadSingleUserByEmail(newUser.email);
      if (!newUserDataInDb) {
        throw new Error(
          "An error occurred while inserting user to the database."
        );
      }

      return newUserDataInDb;
    } catch (error: any) {
      let errorMessage = `An error occurred while creating ${newUser.email}. Please try again.`;
      if (error.message.startsWith("Duplicate entry")) {
        errorMessage = `The email ${newUser.email} is already taken.`;
      }
      console.error(
        `An error occurred while inserting ${newUser.email} into the database.`,
        error
      );
      throw new Error(errorMessage);
    }
  }

  async loadSingleUserByEmail(email: UserType["email"]) {
    try {
      const [queryResult] = await db.query<RowDataPacket[][]>(
        "CALL loadSingleUserByEmail(?)",
        [email]
      );

      const userRows = queryResult[0];
      if (!userRows || userRows.length === 0) {
        return null;
      }

      const userData: UserType = {
        userId: userRows[0].user_id,
        email: userRows[0].email,
        hashedPassword: userRows[0].hashed_password,
        firstName: userRows[0].first_name,
        lastName: userRows[0].last_name,
        createdAt: userRows[0].created_at,
      };

      return userData;
    } catch (error) {
      const errorMessage = `Error loading user with email ${email} by id.`;
      console.error(errorMessage, error);
      throw new Error(errorMessage);
    }
  }

  async loadSingleUserById(userId: UserType["userId"]) {
    try {
      const [queryResult] = await db.query<RowDataPacket[][]>(
        "CALL loadSingleUserById(?)",
        [userId]
      );

      const userRows = queryResult[0];
      if (!userRows || userRows.length === 0) {
        return null;
      }

      const userData: UserType = {
        userId: userRows[0].user_id,
        email: userRows[0].email,
        hashedPassword: userRows[0].hashed_password,
        firstName: userRows[0].first_name,
        lastName: userRows[0].last_name,
        createdAt: userRows[0].created_at,
      };

      return userData;
    } catch (error) {
      const errorMessage = `Error loading user with id ${userId} by id.`;
      console.error(errorMessage, error);
      throw new Error(errorMessage);
    }
  }
}
