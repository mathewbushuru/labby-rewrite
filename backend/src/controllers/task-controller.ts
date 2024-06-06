import { type Request, type Response } from "express";

export default class TaskController {
  /**
   * Public methods
   */
  // GET /task/all
  async getAllTasks(_req: Request, res: Response) {
    return res.json({ message: "Get All Tasks controller." });
  }
}
