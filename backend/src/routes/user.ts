import { Router, type Request, type Response } from "express";

import UserController from "../controllers/user-controller";
import { type NewUserType } from "../types/user-types";

const router = Router();
const userController = new UserController();

/**
 * @desc:       Sign up - create user
 * @listens:    POST /user/
 * @access:     public
 */
router.post("/", (req: Request, res: Response) => {
  const createUserData = req.body as NewUserType;

  if (!createUserData) {
    return res
      .status(400)
      .json({ message: "User data required to create user." });
  }
  if (!createUserData.email) {
    return res.status(400).json({ message: "Email is required to sign up." });
  }
  if (!createUserData.password) {
    return res
      .status(400)
      .json({ message: "Password is required to sign up." });
  }
  if (!createUserData.user_id) {
    return res
      .status(400)
      .json({ message: "User Id (uuid) is required to sign up." });
  }

  userController.saveUser(createUserData);

  console.log("Signup successful.");
  return res.json({ message: "Signup successful." });
});

export default router;
