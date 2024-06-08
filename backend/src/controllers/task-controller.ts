import { type Request, type Response } from "express";

export default class TaskController {
  /**
   * Public methods
   */
  // GET /task/all
  async getAllTasks(_req: Request, res: Response) {
    //TODO: get all tasks from database
    return res.json({ message: "Get All Tasks controller." });
  }
}
