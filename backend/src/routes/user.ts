import { Router } from "express";

import UserController from "../controllers/user-controller";

const router = Router();
const userController = new UserController();

router.post("/signup", (req, res) => userController.signupUser(req, res));
router.post("/login", (req, res) => userController.loginUser(req, res));

export default router;
