import { type FetchBaseQueryError } from "@reduxjs/toolkit/query";

export function isServerErrorResponse(
  error: unknown,
): error is FetchBaseQueryError & {
  status: number;
  data: {
    errorMessage: string;
  };
} {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    "data" in error &&
    !("error" in error)
  );
}

export const localStorageHelpers = {
  getToken: function (): string | null {
    const token = window.localStorage.getItem("labby_token");
    if (token) {
      return JSON.parse(token);
    } else {
      return null;
    }
  },
  setToken: function (token: string) {
    window.localStorage.setItem("labby_token", JSON.stringify(token));
  },
  removeToken: function () {
    window.localStorage.removeItem("labby_token");
  },
};
