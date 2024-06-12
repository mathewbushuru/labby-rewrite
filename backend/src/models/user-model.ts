import { type RowDataPacket } from "mysql2";

import {
  mysqlConnectionPool,
  postgresConnectionPool,
} from "../config/database";
import { type NewUserType, type UserType } from "../types/user-types";

export class UserModel {
  /**
   * Class properties
   */
  private readonly MYSQL_OR_POSTGRES = process.env.database as
    | "mysql"
    | "postgres";

  /**
   * Public methods
   */
  async addUser(newUser: NewUserType) {
    return this.MYSQL_OR_POSTGRES === "postgres"
      ? this.addUserPostgres(newUser)
      : this.addUserMysql(newUser);
  }

  async loadSingleUserByEmail(email: UserType["email"]) {
    return this.MYSQL_OR_POSTGRES === "postgres"
      ? this.loadSingleUserByEmailPostgres(email)
      : this.loadSingleUserByEmailMysql(email);
  }

  async loadSingleUserById(userId: UserType["userId"]) {
    return this.MYSQL_OR_POSTGRES === "postgres"
      ? this.loadSingleUserByIdPostgres(userId)
      : this.loadSingleUserByIdMysql(userId);
  }

  /**
   * Private methods
   */
  // add user
  private async addUserPostgres(newUser: NewUserType) {
    try {
      const userRows = await postgresConnectionPool`
                          SELECT * FROM addUser (
                            ${newUser.email},
                            ${newUser.hashedPassword},
                            ${newUser.firstName},
                            ${newUser.lastName}
                          )
                        `;

      if (!userRows || userRows.length === 0) {
        throw new Error(
          "An error occurred while inserting user to the database."
        );
      }

      const createdUser: UserType = {
        userId: userRows[0].user_id,
        email: userRows[0].email,
        hashedPassword: userRows[0].hashed_password,
        firstName: userRows[0].first_name,
        lastName: userRows[0].last_name,
        createdAt: userRows[0].created_at,
      };

      return createdUser;
    } catch (error: any) {
      console.error(error);
      let errorMessage = `An error occurred while creating ${newUser.email}. Please try again.`;
      if (
        error.message ===
        'duplicate key value violates unique constraint "users_email_key"'
      ) {
        errorMessage = `The email ${newUser.email} is already taken.`;
      }
      throw new Error(errorMessage);
    }
  }

  private async addUserMysql(newUser: NewUserType) {
    try {
      await mysqlConnectionPool.query("CALL addUser(?,?,?,?)", [
        newUser.email,
        newUser.hashedPassword,
        newUser.firstName,
        newUser.lastName,
      ]);

      const newUserDataInDb = await this.loadSingleUserByEmailMysql(newUser.email);
      if (!newUserDataInDb) {
        throw new Error(
          "An error occurred while inserting user to the database."
        );
      }

      return newUserDataInDb;
    } catch (error: any) {
      console.error(error);
      let errorMessage = `An error occurred while creating ${newUser.email}. Please try again.`;
      if (error.message.startsWith("Duplicate entry")) {
        errorMessage = `The email ${newUser.email} is already taken.`;
      }
      throw new Error(errorMessage);
    }
  }

  // load single user by email
  private async loadSingleUserByEmailPostgres(email: UserType["email"]) {
    try {
      const userRows =
        await postgresConnectionPool`SELECT * FROM loadSingleUserByEmail(${email})`;

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
    } catch (error: any) {
      const errorMessage = `Error loading user with email ${email} by id.`;
      console.error(errorMessage, error);
      throw new Error(errorMessage);
    }
  }

  private async loadSingleUserByEmailMysql(email: UserType["email"]) {
    try {
      const [queryResult] = await mysqlConnectionPool.query<RowDataPacket[][]>(
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

  // load single user by id
  private async loadSingleUserByIdPostgres(userId: UserType["userId"]) {
    try {
      const userRows =
        await postgresConnectionPool`SELECT * FROM loadSingleUserById(${userId})`;

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
    } catch (error: any) {
      const errorMessage = `Error loading user with id ${userId} by id.`;
      console.error(errorMessage, error);
      throw new Error(errorMessage);
    }
  }

  private async loadSingleUserByIdMysql(userId: UserType["userId"]) {
    try {
      const [queryResult] = await mysqlConnectionPool.query<RowDataPacket[][]>(
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
