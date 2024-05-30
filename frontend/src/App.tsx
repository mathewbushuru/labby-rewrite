import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

import { store } from "@/store/store";
import { useGetRootQuery } from "@/api";

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

function AppRouter() {
  const { data } = useGetRootQuery();
  data && console.log(data);
  return <RouterProvider router={publicRouter} />;
}

function App() {
  return (
    <ReduxProvider store={store}>
      <AppRouter />
    </ReduxProvider>
  );
}

export default App;
