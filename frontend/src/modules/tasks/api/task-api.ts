import checklistsApi from "@/api";

import { type TaskType } from "@/modules/tasks/types/task-types";

const taskApi = checklistsApi.injectEndpoints({
  endpoints: (builder) => ({
    loadAllTasks: builder.query<Record<string, TaskType>, void>({
      query: () => `/task/all`,
      providesTags: ["task"],
    }),

    createTask: builder.mutation<
      TaskType,
      Omit<TaskType, "taskId" | "createdAt">
    >({
      query: (taskData) => ({
        url: "/task/new",
        method: "POST",
        body: taskData,
      }),
      invalidatesTags: ["task"],
    }),
  }),
});

export const { useLoadAllTasksQuery, useCreateTaskMutation } = taskApi;

export default taskApi;
