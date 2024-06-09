import { type RowDataPacket, type ResultSetHeader } from "mysql2";

import db from "../config/database";
import { type NewTaskType, type TaskType } from "../types/task-types";

export class TaskModel {
  async addTask(newTask: NewTaskType) {
    const [insertQueryResult] = await db.query<ResultSetHeader>(
      `INSERT INTO tasks 
              (
                task_name,
                task_description,
                task_category,
                fk_task_creator_id,
                task_colour_id
              ) VALUES (?, ?, ?, ?, ?);`,
              [
                newTask.taskName,
                newTask.taskDescription,
                newTask.taskCategory,
                newTask.taskCreatorId,
                newTask.taskColourId,
            ]
    );

    const [rows] = await db.query<RowDataPacket[]>(
      `SELECT * FROM tasks WHERE task_id  =  ?`,
      insertQueryResult.insertId
    );

    const taskData: TaskType = {
      taskId: rows[0].task_id,
      taskName: rows[0].task_name,
      taskDescription: rows[0].task_description,
      taskCategory: rows[0].task_category,
      taskCreatorId: rows[0].fk_task_creator_id,
      taskColourId: rows[0].task_colour_id,
      createdAt: rows[0].created_at,
    };

    return taskData;
  }

  async loadAllTasks() {
    const [queryResult] = await db.query<RowDataPacket[]>(
      "SELECT * FROM tasks;"
    );

    const allTasks: TaskType[] = queryResult.map((dbTask) => ({
      taskId: dbTask.task_id,
      taskName: dbTask.task_name,
      taskDescription: dbTask.task_description,
      taskCategory: dbTask.task_category,
      taskCreatorId: dbTask.fk_task_creator_id,
      taskColourId: dbTask.task_colour_id,
      createdAt: dbTask.created_at,
    }));

    return allTasks;
  }
}
