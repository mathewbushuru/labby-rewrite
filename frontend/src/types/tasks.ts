export type TaskType = {
    id: string;
    taskName: string;
    taskDescription: string;
    taskColourId?: number
  };
  
  export type TasksColumnType = {
    id: string;
    name: string;
    taskIds: string[];
  };
  
  export type AllTasksDataType = {
    tasks: Record<string, TaskType>;
    columns: Record<string, TasksColumnType>;
    columnIdsOrder: string[];
  }; 