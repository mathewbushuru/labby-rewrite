import { Router } from "express";

import TaskController from "../controllers/task-controller";

const router = Router();
const taskController = new TaskController();

router.post("/new", (req, res) => taskController.postCreateTask(req, res));
router.get("/all", (req, res) => taskController.getAllTasks(req, res));

export default router;
