import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { type RootState } from "@/store/store";
import {
  type LoginRequestType,
  type LoginResponseType,
  type SignupRequestType,
  type BackendUserType,
} from "@/types/user";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

console.log(`Connecting to server:  ${SERVER_URL}`);

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
  tagTypes: [],
  endpoints: (builder) => ({
    getRoot: builder.query<string, void>({
      query: () => `/`,
    }),

    login: builder.mutation<LoginResponseType, LoginRequestType>({
      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: [],
    }),

    signup: builder.mutation<BackendUserType, SignupRequestType>({
      query: (signupData) => ({
        url: "/user/signup",
        method: "POST",
        body: signupData,
      }),
    }),
  }),
});

export const { useGetRootQuery, useLoginMutation, useSignupMutation } =
  checklistsApi;

export default checklistsApi;