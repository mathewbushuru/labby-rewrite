import checklistsApi from ".";

import { type TaskType } from "@/types/tasks";

const taskApi = checklistsApi.injectEndpoints({
  endpoints: (builder) => ({
    loadAllTasks: builder.query<Record<string, TaskType>, void>({
      query: () => `/task/all`,
    }),
  }),
});

export const { useLoadAllTasksQuery } = taskApi;

export default taskApi;
