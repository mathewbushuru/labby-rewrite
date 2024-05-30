import bcrypt from "bcrypt";
import { type Request, type Response } from "express";

import { UserModel } from "../models/user-model";
import { type NewUserType } from "../types/user-types";

const userModel = new UserModel();

export default class UserController {
  /**
   * Class properties
   */
  private readonly PASSWORD_SALT_ROUNDS = 10;

  /**
   * Public methods
   */
  async signUpUser(req: Request, res: Response) {
    const createUserData = req.body as Omit<NewUserType, "hashed_password"> & {
      password: string;
    };

    if (!createUserData) {
      return res
        .status(400)
        .json({ errorMessage: "User data is required sign up." });
    }
    if (!createUserData.email) {
      return res
        .status(400)
        .json({ errorMessage: "Email is required to sign up." });
    }
    if (!this.validateEmail(createUserData.email)) {
      return res.status(400).json({ errorMessage: "Email is invalid" });
    }
    if (!createUserData.password) {
      return res
        .status(400)
        .json({ errorMessage: "Password is required to sign up." });
    }

    const hashedPassword = await this.hashPassword(createUserData.password);

    const signupData: NewUserType = {
      email: createUserData.email,
      hashed_password: hashedPassword,
    }

    try {
      const newUserData = await userModel.addUser(signupData);

      const {hashed_password, ...usedDataWithoutPassword} = newUserData;

      return res.status(201).json(usedDataWithoutPassword);
    } catch (error: any) {
      const errorMessage = error?.message || "Something went wrong.";
      return res.status(500).json({ errorMessage });
    }
  }

  /**
   * Private methods
   */
  private validateEmail(email: string) {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  }

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
}
