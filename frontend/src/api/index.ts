import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { type RootState } from "@/store/store";
import { type LoginRequestType, type BackendUserType } from "@/types/user";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

console.log(`Connecting to server:  ${SERVER_URL}`);

const checklistsApi = createApi({
  reducerPath: "checklistsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_URL,
    prepareHeaders: (headers, { getState }) => {
      // if token in redux store, use it for all authenticated requests
      const token = (getState() as RootState).adminAuth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    getRoot: builder.query<string, void>({
      query: () => `/`,
    }),

    adminLogin: builder.mutation<BackendUserType, LoginRequestType>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: [],
    }),
  }),
});

export const { useGetRootQuery, useAdminLoginMutation } = checklistsApi;

export default checklistsApi;
