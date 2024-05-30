export const localStorageHelpers = {
  getToken: function (): string | null {
    const token = window.localStorage.getItem("checklists_token");
    if (token) {
      return JSON.parse(token);
    } else {
      return null;
    }
  },
  setToken: function (token: string) {
    window.localStorage.setItem("checklists_token", JSON.stringify(token));
  },
  removeToken: function () {
    window.localStorage.removeItem("checklists_token");
  },
};