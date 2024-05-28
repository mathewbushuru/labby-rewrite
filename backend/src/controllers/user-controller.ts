import { UserModel } from "../models/user-model";

import { type NewUserType } from "../types/user-types";

export default class UserController {
  saveUser(newUserData: NewUserType) {
    const userModel = new UserModel();

    userModel.insertUser(newUserData);
  }
}
