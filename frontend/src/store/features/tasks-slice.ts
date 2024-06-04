import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { type AllTasksDataType, type TaskType } from "@/types/tasks";

const initialAllTasksState: AllTasksDataType = {
  tasks: {
    "task-1": {
      id: "task-1",
      taskName: "Acme Ecommerce App",
      taskDescription: "",
      taskCreatorId: "1",
      taskColourId: Math.floor(Math.random() * 5 + 1),
    },
    "task-2": {
      id: "task-2",
      taskName: "Checklists App",
      taskDescription: "",
      taskCreatorId: "1",
      taskColourId: Math.floor(Math.random() * 5 + 1),
    },
    "task-3": {
      id: "task-3",
      taskName: "Flix App",
      taskDescription: "",
      taskCreatorId: "1",
      taskColourId: Math.floor(Math.random() * 5 + 1),
    },
    "task-4": {
      id: "task-4",
      taskName: "Outfits App",
      taskDescription: "",
      taskCreatorId: "1",
      taskColourId: Math.floor(Math.random() * 5 + 1),
    },
    "task-5": {
      id: "task-5",
      taskName: "Battleship Game",
      taskDescription: "",
      taskCreatorId: "1",
      taskColourId: Math.floor(Math.random() * 5 + 1),
    },
  },
  columns: {
    "adopt-me": {
      id: "adopt-me",
      name: "Adopt Me",
      taskIds: ["task-4"],
    },
    "to-do": {
      id: "to-do",
      name: "To Do",
      taskIds: ["task-3"],
    },
    "in-progress": {
      id: "in-progress",
      name: "In Progress",
      taskIds: ["task-1", "task-2"],
    },
    completed: {
      id: "completed",
      name: "Completed",
      taskIds: ["task-5"],
    },
  },
  columnIdsOrder: ["adopt-me", "to-do", "in-progress", "completed"],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    ...initialAllTasksState,
    resetTasksData: initialAllTasksState,
  },
  reducers: {
    setAllTasksData: (state, action: PayloadAction<AllTasksDataType>) => {
      return { ...state, ...action.payload };
    },
    resetAllTasksData: (state) => {
      return { ...state.resetTasksData, resetTasksData: state.resetTasksData };
    },
    addNewTask: (
      state,
      action: PayloadAction<{
        taskName: string;
        taskDescription: string;
        taskCategoryId: string;
        taskCreatorId: string;
      }>,
    ) => {
      const newId = `task-${Math.floor(Math.random() * 1000)}`;
      const newTaskData: TaskType = {
        id: newId,
        taskName: action.payload.taskName,
        taskDescription: action.payload.taskDescription,
        taskCreatorId: action.payload.taskCreatorId,
        taskColourId: Math.floor(Math.random() * 5 + 1),
      };
      state.tasks[newId] = newTaskData;
      state.columns[action.payload.taskCategoryId].taskIds.push(newId);
      state.resetTasksData.tasks[newId] = newTaskData;
      state.resetTasksData.columns[action.payload.taskCategoryId].taskIds.push(
        newId,
      );
    },
    updateTaskData: (
      state,
      action: PayloadAction<{
        taskId: string;
        taskName: string;
        taskDescription: string;
      }>,
    ) => {
      state.tasks[action.payload.taskId].taskName = action.payload.taskName;
      state.tasks[action.payload.taskId].taskDescription =
        action.payload.taskDescription;

      state.resetTasksData.tasks[action.payload.taskId].taskName =
        action.payload.taskName;
      state.resetTasksData.tasks[action.payload.taskId].taskDescription =
        action.payload.taskDescription;
    },
  },
});

export const {
  setAllTasksData,
  resetAllTasksData,
  addNewTask,
  updateTaskData,
} = tasksSlice.actions;

const tasksReducer = tasksSlice.reducer;
export default tasksReducer;
