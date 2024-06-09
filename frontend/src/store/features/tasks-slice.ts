import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import taskApi from "@/api/task-api";
import { type AllTasksDataType, type TaskType } from "@/types/task-types";

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
      return {
        ...state,
        ...action.payload,
        resetTasksData: {
          ...state.resetTasksData,
          ...action.payload,
        },
      };
    },
    resetAllTasksData: (state) => {
      return { ...state.resetTasksData, resetTasksData: state.resetTasksData };
    },
    filterTasksOnSearch: (state, action: PayloadAction<AllTasksDataType>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    addNewTask: (
      state,
      action: PayloadAction<{
        taskName: string;
        taskDescription: string;
        taskCategory: TaskType["taskCategory"];
        taskCreatorId: string;
      }>,
    ) => {
      const newId = `${Math.floor(Math.random() * 1000)}`;
      const newTaskData: TaskType = {
        taskId: newId,
        taskName: action.payload.taskName,
        taskDescription: action.payload.taskDescription,
        taskCategory: action.payload.taskCategory,
        taskCreatorId: action.payload.taskCreatorId,
        taskColourId: Math.floor(Math.random() * 5 + 1),
        createdAt: new Date().toISOString(),
      };

      state.tasks[newId] = newTaskData;
      state.taskCategories[action.payload.taskCategory].taskIds.push(newId);

      state.resetTasksData.tasks[newId] = newTaskData;
      state.resetTasksData.taskCategories[
        action.payload.taskCategory
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
        (_state, _action) => {},
      )
      .addMatcher(
        taskApi.endpoints.loadAllTasks.matchFulfilled,
        (state, action) => {
          state.tasks = action.payload;
          state.resetTasksData.tasks = action.payload;

          for (let taskId in action.payload) {
            let taskCategory = action.payload[taskId].taskCategory;
            state.taskCategories[taskCategory].taskIds.push(taskId);
            state.resetTasksData.taskCategories[taskCategory].taskIds.push(
              taskId,
            );
          }
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
  filterTasksOnSearch,
  addNewTask,
  updateTaskData,
} = tasksSlice.actions;

const tasksReducer = tasksSlice.reducer;
export default tasksReducer;
