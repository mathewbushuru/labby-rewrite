export type TaskType = {
  id: string;
  taskName: string;
  taskDescription: string;
  taskCreatorId: string;
  taskColourId?: number;
};

export type TasksColumnType = {
  id: string;
  name: string;
  taskIds: string[];
};

export type AllTasksDataType = {
  tasks: Record<string, TaskType>;                  // `tasks` object keys expected to be taskIds
  columns: Record<string, TasksColumnType>;         // `columns` object keys expected to be columnIds
  columnIdsOrder: string[];
};
