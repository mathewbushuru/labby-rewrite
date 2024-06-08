import { type RowDataPacket } from "mysql2";

import db from "../config/database";
import { type NewTaskType, type TaskType } from "../types/task-types";

export class TaskModel {
  async addTask(newTask: NewTaskType) {
    const [queryResult] = await db.query<RowDataPacket[][]>(
      "CALL addTask(?, ?, ?, ?);",
      [
        newTask.taskName,
        newTask.taskDescription,
        newTask.taskCreatorId,
        newTask.taskColourId,
      ]
    );

    const rows = queryResult[0];

    if (!rows || rows.length === 0) {
      throw new Error(
        "An error occurred while creating  this task."
      );
    }

    const taskData: TaskType = {
      taskId: rows[0].task_id,
      taskName: rows[0].task_name,
      taskDescription: rows[0].task_description,
      taskCreatorId: rows[0].fk_task_creator_id,
      taskColourId: rows[0].task_colour_id,
      createdAt: rows[0].created_at,
    };

   return taskData;
  }
}
