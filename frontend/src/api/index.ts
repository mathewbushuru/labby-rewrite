import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { type RootState } from "@/store";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

console.log(`Server URL: ${SERVER_URL}`);

const checklistsApi = createApi({
  reducerPath: "checklistsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_URL,
    prepareHeaders: (headers, { getState }) => {
      // if token in redux store, use it for all authenticated requests
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["task"],
  endpoints: (builder) => ({
    getRoot: builder.query<string, void>({
      query: () => `/`,
    }),
    // other endpoints injected from different files
    // ... @/modules/auth/api/auth-api.ts
    // ... @/modules/tasks/api/task-api.ts
  }),
});

export const { useGetRootQuery } = checklistsApi;

export default checklistsApi;
