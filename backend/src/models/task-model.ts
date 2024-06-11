import { type RowDataPacket, type ResultSetHeader } from "mysql2";

import {
  mysqlConnectionPool,
  postgresConnectionPool,
} from "../config/database";
import { type NewTaskType, type TaskType } from "../types/task-types";

export class TaskModel {
  /**
   * Class properties
   */
  private readonly MYSQL_OR_POSTGRES = process.env.database as
    | "mysql"
    | "postgres";

  /**
   * Public methods
   */
  async addTask(newTask: NewTaskType) {
    return this.MYSQL_OR_POSTGRES === "postgres"
      ? this.addTaskPostgres(newTask)
      : this.addTaskMysql(newTask);
  }

  async loadAllTasks() {
    return this.MYSQL_OR_POSTGRES === "postgres"
      ? this.loadAllTasksMysql()
      : this.loadAllTasksMysql();
  }

  /**
   * Private methods
   */
  // add task
  private async addTaskPostgres(newTask: NewTaskType) {
    try {
      const taskRows = await postgresConnectionPool`
                          SELECT * FROM addTask(
                            ${newTask.taskName},
                            ${newTask.taskDescription},
                            ${newTask.taskCategory},
                            ${newTask.taskCreatorId},
                            ${newTask.taskColourId}
                          )
                          `;

      if (!taskRows || taskRows.length === 0) {
        throw new Error(
          "Something went wrong when creating new task, try again."
        );
      }

      const createdTask: TaskType = {
        taskId: taskRows[0].task_id,
        taskName: taskRows[0].task_name,
        taskDescription: taskRows[0].task_description,
        taskCategory: taskRows[0].task_category,
        taskCreatorId: taskRows[0].fk_task_creator_id,
        taskColourId: taskRows[0].task_colour_id,
        createdAt: taskRows[0].created_at,
      };

      return createdTask;
    } catch (error: any) {
      console.error(error);
      let errorMessage =
        "Something went wrong when creating new task, try again.";

      if (
        error.message ===
        'insert or update on table "tasks" violates foreign key constraint "tasks_fk_task_creator_id_fkey"'
      ) {
        errorMessage = "The creator of this task does not exist.";
      }

      if (error.message === "value too long for type character varying(255)") {
        errorMessage =
          "Task description is too long. Use maximum of 250 characters.";
      }

      throw new Error(errorMessage);
    }
  }
  private async addTaskMysql(newTask: NewTaskType) {
    try {
      const [insertQueryResult] =
        await mysqlConnectionPool.query<ResultSetHeader>(
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

      const [rows] = await mysqlConnectionPool.query<RowDataPacket[]>(
        `SELECT * FROM tasks WHERE task_id  =  ?`,
        insertQueryResult.insertId
      );

      if (!rows || rows.length === 0) {
        throw new Error(
          "Something went wrong when creating new task, try again."
        );
      }

      const createdTask: TaskType = {
        taskId: rows[0].task_id,
        taskName: rows[0].task_name,
        taskDescription: rows[0].task_description,
        taskCategory: rows[0].task_category,
        taskCreatorId: rows[0].fk_task_creator_id,
        taskColourId: rows[0].task_colour_id,
        createdAt: rows[0].created_at,
      };

      return createdTask;
    } catch (error: any) {
      console.error(error);
      let errorMessage =
        "Something went wrong when creating new task, try again.";

      if (
        error.message ===
        "Cannot add or update a child row: a foreign key constraint fails (`checklistsdb`.`tasks`, CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`fk_task_creator_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE)"
      ) {
        errorMessage = "The creator of this task does not exist.";
      }

      if (
        error.message === "Data too long for column 'task_description' at row 1"
      ) {
        errorMessage =
          "Task description is too long. Use maximum of 250 characters.";
      }

      throw new Error(errorMessage);
    }
  }

  private async loadAllTasksMysql() {
    const [queryResult] = await mysqlConnectionPool.query<RowDataPacket[]>(
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
