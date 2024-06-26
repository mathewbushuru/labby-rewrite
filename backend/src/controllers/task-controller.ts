import { type Request, type Response } from "express";

import { TaskModel } from "../models/task-model";
import { type TaskType, type NewTaskType } from "../types/task-types";

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

    if (!createTaskRequestData.taskCreatorId) {
      return res.status(400).json({
        errorMessage: "Task creator id is required",
      });
    }

    if (!createTaskRequestData.taskDescription) {
      createTaskRequestData.taskDescription = "";
    }

    if (!createTaskRequestData.taskCategory) {
      createTaskRequestData.taskCategory = "adopt-me";
    }

    if (
      !["adopt-me", "to-do", "in-progress", "completed"].includes(
        createTaskRequestData.taskCategory
      )
    ) {
      createTaskRequestData.taskCategory = "adopt-me";
    }

    if (!createTaskRequestData.taskColourId) {
      createTaskRequestData.taskColourId = Math.floor(Math.random() * 5 + 1);
    }

    try {
      const newTaskData = await taskModel.addTask(createTaskRequestData);
      return res.status(201).json(newTaskData);
    } catch (error: any) {
      console.error(error);
      let errorMessage =
        error.message ||
        "Something went wrong when creating new task, try again.";

      return res.status(500).json({ errorMessage });
    }
  }

  // GET /task/all
  async getAllTasks(_req: Request, res: Response) {
    try {
      const allTasksArr = await taskModel.loadAllTasks();

      const allTasksObj: Record<number, TaskType> = {};
      for (let task of allTasksArr) {
        allTasksObj[task.taskId] = task;
      }

      return res.json(allTasksObj);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ errorMessage: "Something went wrong." });
    }
  }
}
