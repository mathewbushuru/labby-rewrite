export type TaskType = {
  id: string;
  taskName: string;
  taskDescription: string;
  taskCreatorId: string;
  taskColourId?: number;
};

export type TaskCategoryType = {
  id: string;
  name: string;
  taskIds: string[];
};

export type AllTasksDataType = {
  tasks: Record<string, TaskType>;                          // `tasks` object keys expected to be taskIds
  taskCategories: Record<string, TaskCategoryType>;         // `taskCategory` object keys expected to be taskCategoryIds
  taskCategoryIdsOrder: string[];
};
