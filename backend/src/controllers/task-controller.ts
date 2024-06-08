import { type Request, type Response } from "express";

import { TaskModel } from "../models/task-model";
import { type NewTaskType } from "../types/task-types";

const taskModel = new TaskModel();

export default class TaskController {
  /**
   * Public methods
   */
  // POST /task/new
  async postCreateTask(req: Request, res: Response) {
    const createTaskRequestData = req.body as NewTaskType;

    if (!createTaskRequestData.taskName) {
      return res.status(400).json({
        errorMessage: "Task name is required",
      });
    }

    if (!createTaskRequestData.taskDescription) {
      return res.status(400).json({
        errorMessage: "Task description is required",
      });
    }

    if (!createTaskRequestData.taskCreatorId) {
      return res.status(400).json({
        errorMessage: "Task creator id is required",
      });
    }

    if (!createTaskRequestData.taskColourId) {
      createTaskRequestData.taskColourId = Math.floor(Math.random() * 5 + 1);
    }

    try {
      const newTaskData = await taskModel.addTask(createTaskRequestData);
      return res.status(201).json(newTaskData);
    } catch (error: any) {
      console.error(error);
      let errorMessage = error?.message || "Something went wrong.";
      if (
        errorMessage ===
        "Cannot add or update a child row: a foreign key constraint fails (`checklistsdb`.`tasks`, CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`fk_task_creator_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE)"
      ) {
        errorMessage = "The creator of this task does not exist.";
      }
      return res.status(500).json({ errorMessage });
    }
  }

  // GET /task/all
  async getAllTasks(_req: Request, res: Response) {
    const allTasks =  await taskModel.loadAllTasks();
    return res.json(allTasks);
  }
}
