import { Router } from "express";

import UserController from "../controllers/user-controller";

const router = Router();
const userController = new UserController();

router.post("/signup", (req, res) => userController.postSignupUser(req, res));
router.post("/login", (req, res) => userController.postLoginUser(req, res));

export default router;
