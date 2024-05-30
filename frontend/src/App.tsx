import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

import { store } from "@/store/store";

import LoginPage from "@/pages/login-page";
import SignupPage from "@/pages/signup-page";

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
  return (
    <ReduxProvider store={store}>
      <RouterProvider router={publicRouter} />
    </ReduxProvider>
  );
}

export default App;
