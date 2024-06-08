export type TaskType = {
  taskId: number;                   
  taskName: string;
  taskDescription: string;
  taskCreatorId: number;
  taskColourId: number;
  createdAt: string;
};

export type NewTaskType = {
  taskName: string;
  taskDescription: string;
  taskCreatorId: number;
  taskColourId: number;
};

export type TaskCategoryType = {
  id: number;
  name: string;
  taskIds: number[];
};

export type NewTaskCategoryType = {
  name: string;
  taskIds?: number[];
};

export type AllTasksDataType = {
  tasks: Record<number, TaskType>; // `tasks` object keys expected to be taskIds
  taskCategories: Record<number, TaskCategoryType>; // `taskCategory` object keys expected to be taskCategoryIds
  taskCategoryIdsOrder: number[];
};
