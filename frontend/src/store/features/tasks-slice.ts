import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { type AllTasksDataType } from "@/types/tasks";

const initialAllTasksState: AllTasksDataType = {
  tasks: {
    "task-1": { id: "task-1", taskName: "Acme Ecommerce App" },
    "task-2": { id: "task-2", taskName: "Checklists App" },
    "task-3": { id: "task-3", taskName: "Flix App" },
    "task-4": { id: "task-4", taskName: "Outfits App" },
    "task-5": { id: "task-5", taskName: "Battleship Game" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      name: "Adopt Me",
      taskIds: ["task-4"],
    },
    "column-2": {
      id: "column-2",
      name: "To Do",
      taskIds: ["task-3"],
    },
    "column-3": {
      id: "column-3",
      name: "In Progress",
      taskIds: ["task-1", "task-2"],
    },
    "column-4": {
      id: "column-4",
      name: "Completed",
      taskIds: ["task-5"],
    },
  },
  columnIdsOrder: ["column-1", "column-2", "column-3", "column-4"],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    ...initialAllTasksState,
    originalTasks: initialAllTasksState,
  },
  reducers: {
    setAllTasksData: (state, action: PayloadAction<AllTasksDataType>) => {
      return { ...state, ...action.payload };
    },
    resetAllTasksData: (state) => {
      return { ...state.originalTasks, originalTasks: state.originalTasks };
    },
  },
});

export const { setAllTasksData, resetAllTasksData } = tasksSlice.actions;

const tasksReducer = tasksSlice.reducer;
export default tasksReducer;
