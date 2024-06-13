import { createBrowserRouter } from "react-router-dom";

import LoginPage from "@/modules/auth/pages/login-page";
import SignupPage from "@/modules/auth/pages/signup-page";
import TasksPage from "@/modules/tasks/pages/task-page";

export const publicRouter = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
]);

export const privateRouter = createBrowserRouter([
  {
    path: "/",
    element: <TasksPage />,
  },
  {
    path: "/*",
    element: <TasksPage />,
  },
]);
