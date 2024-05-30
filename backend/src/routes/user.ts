import { Router } from "express";

import UserController from "../controllers/user-controller";

const router = Router();
const userController = new UserController();

router.post("/", (req, res) => userController.signUpUser(req, res));
router.post("/signup", (req, res) => userController.signUpUser(req, res));

export default router;
