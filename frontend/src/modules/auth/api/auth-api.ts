import checklistsApi from "@/api";

import { type BackendUserType } from "@/types/user-types";
import {
  type LoginRequestType,
  type LoginResponseType,
  type SignupRequestType,
} from "@/modules/auth/types/auth-types";

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
      invalidatesTags: [],
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
