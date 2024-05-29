import { type Request, type Response } from "express";
import { UserModel } from "../models/user-model";

import { type NewUserType } from "../types/user-types";

const userModel = new UserModel();

export default class UserController {
  async signUpUser(req: Request, res: Response) {
    const createUserData = req.body as NewUserType;

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

    try {
      const result = await userModel.addUser(createUserData);
      return res.status(201).json(result);
    } catch (error: any) {
      const errorMessage = error?.message || "Something went wrong.";
      return res.status(500).json({ errorMessage });
    }
  }

  private validateEmail(email: string) {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  }
}
