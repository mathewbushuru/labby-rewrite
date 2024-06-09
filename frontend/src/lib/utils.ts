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