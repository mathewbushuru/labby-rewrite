import { RouterProvider, createBrowserRouter } from "react-router-dom";

import LoginPage from "@/pages/login-page";
import SignupPage from "./pages/signup-page";

const publicRouter = createBrowserRouter([
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

function App() {
  return <RouterProvider router={publicRouter} />;
}

export default App;
