export type TaskType = {
  taskId: number;
  taskName: string;
  taskDescription: string;
  taskCategory: "adopt-me" | "to-do" | "in-progress" | "completed";
  taskCategoryPosition: number;
  taskCreatorId: number;
  taskColourId: number;
  createdAt: string;
};

export type NewTaskType = Omit<TaskType, "taskId" | "createdAt">;
