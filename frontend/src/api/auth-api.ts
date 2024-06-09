import checklistsApi from ".";

import {
  type LoginRequestType,
  type LoginResponseType,
  type SignupRequestType,
  type BackendUserType,
} from "@/types/user-types";

const authApi = checklistsApi.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useLoginMutation, useSignupMutation } = authApi;
