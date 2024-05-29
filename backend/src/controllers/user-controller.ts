import { type Request, type Response } from "express";
import { UserModel } from "../models/user-model";

import { type NewUserType } from "../types/user-types";

const userModel = new UserModel();

export default class UserController {
  public signUpUser(req: Request, res: Response) {
    const createUserData = req.body as NewUserType;

    if (!createUserData) {
      return res
        .status(400)
        .json({ message: "User data is required sign up." });
    }
    if (!createUserData.email) {
      return res.status(400).json({ message: "Email is required to sign up." });
    }
    if(!this.validateEmail(createUserData.email)){
      return res.status(400).json({message: "Email is invalid"});
    }
    if (!createUserData.password) {
      return res
        .status(400)
        .json({ message: "Password is required to sign up." });
    }
    if (!createUserData.user_id) {
      return res
        .status(400)
        .json({ message: "User Id is required to sign up." });
    }

    this.saveUser(createUserData);

    console.log("Signup successful.");
    return res.json({ message: "Signup successful." });
  }

  private validateEmail(email: string) {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  }

  private saveUser(newUserData: NewUserType) {
    userModel.insertUser(newUserData);
  }
}
