import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { type Request, type Response } from "express";

import { UserModel } from "../models/user-model";
import {
  type NewUserType,
  type UserLoginRequestType,
  type UserLoginSuccessResponseType,
} from "../types/user-types";

const userModel = new UserModel();

export default class UserController {
  /**
   * Class properties
   */
  private readonly PASSWORD_SALT_ROUNDS = 10;
  private readonly TIME_BEFORE_JWT_TOKEN_EXPIRES = 24 * 60 * 60; // 24 hours

  /**
   * Public methods
   */
  // POST /user/signup
  async signupUser(req: Request, res: Response) {
    const signupRequestData = req.body as Omit<
      NewUserType,
      "hashedPassword"
    > & {
      password: string;
    };

    if (!signupRequestData) {
      return res
        .status(400)
        .json({ errorMessage: "User data is required sign up." });
    }

    if (!signupRequestData.email) {
      return res
        .status(400)
        .json({ errorMessage: "Email is required to sign up." });
    }

    if (!this.validateEmail(signupRequestData.email)) {
      return res.status(400).json({ errorMessage: "Email is invalid" });
    }

    if (!signupRequestData.password) {
      return res
        .status(400)
        .json({ errorMessage: "Password is required to sign up." });
    }

    if (!signupRequestData.firstName) {
      return res
        .status(400)
        .json({ errorMessage: "First name is required to sign up." });
    }

    if (!signupRequestData.lastName) {
      return res
        .status(400)
        .json({ errorMessage: "Last name is required to sign up." });
    }

    const hashedPassword = await this.hashPassword(signupRequestData.password);

    const signupDatabaseData: NewUserType = {
      email: signupRequestData.email,
      hashedPassword: hashedPassword,
      firstName: signupRequestData.firstName,
      lastName: signupRequestData.lastName
    };

    try {
      const newUserData = await userModel.addUser(signupDatabaseData);

      const { hashedPassword, ...userDataWithoutPassword } = newUserData;

      console.log(`[${signupDatabaseData.email}]: Sign up successful`);

      return res.status(201).json(userDataWithoutPassword);
    } catch (error: any) {
      const errorMessage = error?.message || "Something went wrong.";
      return res.status(500).json({ errorMessage });
    }
  }
  
  // POST /user/login
  async loginUser(req: Request, res: Response) {
    const loginRequestData = req.body as UserLoginRequestType;

    if (!loginRequestData) {
      return res
        .status(400)
        .json({ errorMessage: "Email and password is required log in." });
    }

    if (!loginRequestData.email) {
      return res
        .status(400)
        .json({ errorMessage: "Email is required to log in." });
    }

    if (!this.validateEmail(loginRequestData.email)) {
      return res.status(400).json({ errorMessage: "Email is invalid" });
    }

    if (!loginRequestData.password) {
      return res
        .status(400)
        .json({ errorMessage: "Password is required to log in." });
    }

    try {
      const userData = await userModel.loadSingleUserByEmail(
        loginRequestData.email
      );

      if (!userData) {
        const errorMessage = `The email ${loginRequestData.email} is not signed up`;
        return res.status(401).json({ errorMessage });
      }

      const { hashedPassword, ...userDataWithoutPassword } =
        userData;

      const passwordMatches = await this.checkUserPassword(
        loginRequestData.password,
        hashedPassword
      );

      if (!passwordMatches) {
        const errorMessage = "Incorrect password, please try again.";
        return res.status(401).json({ errorMessage });
      }

      console.log(`[${loginRequestData.email}]: Login successful`);

      const jwtToken = jwt.sign(
        { userId: userDataWithoutPassword.userId },
        process.env.JWT_SECRET_KEY!,
        { algorithm: "HS256", expiresIn: this.TIME_BEFORE_JWT_TOKEN_EXPIRES }
      );

      const loginResponseData: UserLoginSuccessResponseType = {
        ...userDataWithoutPassword,
        jwtToken,
        message: "Login successful",
      };

      return res.json(loginResponseData);
    } catch (error: any) {
      const errorMessage =
        error?.errorMessage ||
        "Something went wrong when logging in, try again.";
      return res.status(500).json({ errorMessage });
    }
  }

  /**
   * Private methods
   */
  private async hashPassword(plainPassword: string) {
    const salt = await bcrypt.genSalt(this.PASSWORD_SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    return hashedPassword;
  }

  private async checkUserPassword(
    plainPassword: string,
    hashedPassword: string
  ) {
    const matchedResult: boolean = await bcrypt.compare(
      plainPassword,
      hashedPassword
    );
    return matchedResult;
  }

  private validateEmail(email: string) {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  }
}
