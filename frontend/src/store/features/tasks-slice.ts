import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import taskApi from "@/api/task";
import { type AllTasksDataType, type TaskType } from "@/types/tasks";

const initialAllTasksState2: AllTasksDataType = {
  tasks: {
    "task-1": {
      taskId: "task-1",
      taskName: "Acme Ecommerce App",
      taskDescription: "",
      taskCreatorId: "1",
      taskColourId: Math.floor(Math.random() * 5 + 1),
      createdAt: "2024-06-08T19:57:52.000Z",
    },
    "task-2": {
      taskId: "task-2",
      taskName: "Checklists App",
      taskDescription: "",
      taskCreatorId: "1",
      taskColourId: Math.floor(Math.random() * 5 + 1),
      createdAt: "2024-06-08T19:57:52.000Z",
    },
    "task-3": {
      taskId: "task-3",
      taskName: "Flix App",
      taskDescription: "",
      taskCreatorId: "1",
      taskColourId: Math.floor(Math.random() * 5 + 1),
      createdAt: "2024-06-08T19:57:52.000Z",
    },
    "task-4": {
      taskId: "task-4",
      taskName: "Outfits App",
      taskDescription: "",
      taskCreatorId: "1",
      taskColourId: Math.floor(Math.random() * 5 + 1),
      createdAt: "2024-06-08T19:57:52.000Z",
    },
    "task-5": {
      taskId: "task-5",
      taskName: "Battleship Game",
      taskDescription: "",
      taskCreatorId: "1",
      taskColourId: Math.floor(Math.random() * 5 + 1),
      createdAt: "2024-06-08T19:57:52.000Z",
    },
  },
  taskCategories: {
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
  taskCategoryIdsOrder: ["adopt-me", "to-do", "in-progress", "completed"],
};
const initialAllTasksState: AllTasksDataType = {
  tasks: {},
  taskCategories: {
    "adopt-me": {
      id: "adopt-me",
      name: "Adopt Me",
      taskIds: [],
    },
    "to-do": {
      id: "to-do",
      name: "To Do",
      taskIds: [],
    },
    "in-progress": {
      id: "in-progress",
      name: "In Progress",
      taskIds: [],
    },
    completed: {
      id: "completed",
      name: "Completed",
      taskIds: [],
    },
  },
  taskCategoryIdsOrder: ["adopt-me", "to-do", "in-progress", "completed"],
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
        taskId: newId,
        taskName: action.payload.taskName,
        taskDescription: action.payload.taskDescription,
        taskCreatorId: action.payload.taskCreatorId,
        taskColourId: Math.floor(Math.random() * 5 + 1),
        createdAt: new Date().toISOString(),
      };
      state.tasks[newId] = newTaskData;
      state.taskCategories[action.payload.taskCategoryId].taskIds.push(newId);
      state.resetTasksData.tasks[newId] = newTaskData;
      state.resetTasksData.taskCategories[
        action.payload.taskCategoryId
      ].taskIds.push(newId);
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
  extraReducers: (builder) => {
    builder
      .addMatcher(
        taskApi.endpoints.loadAllTasks.matchPending,
        (_state, action) => {
          console.log("Load all tasks pending", action);
        },
      )
      .addMatcher(
        taskApi.endpoints.loadAllTasks.matchFulfilled,
        (state, action) => {
          console.log("Load all tasks fulfilled", action);
          state.tasks = action.payload;
        },
      )
      .addMatcher(
        taskApi.endpoints.loadAllTasks.matchRejected,
        (_state, action) => {
          console.log("Load all tasks rejected", action);
          return {
            ...initialAllTasksState,
            resetTasksData: initialAllTasksState,
          };
        },
      );
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
