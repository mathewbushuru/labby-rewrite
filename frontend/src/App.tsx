import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { Toaster } from "sonner";

import { store, useAppSelector } from "@/store/store";
import { useGetRootQuery } from "@/api";

import LoginPage from "@/pages/login-page";
import SignupPage from "@/pages/signup-page";
import TicketPage from "@/pages/ticket-page";

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

const privateRouter = createBrowserRouter([
  {
    path: "/",
    element: <TicketPage />,
  },
]);

function AppRouter() {
  const { data } = useGetRootQuery();
  data && console.log(data);

  const user = useAppSelector((state) => state.auth.user);

  const appRouter = user ? privateRouter : publicRouter;

  return <RouterProvider router={appRouter} />;
}

function App() {
  return (
    <ReduxProvider store={store}>
      <AppRouter />
      <Toaster richColors />
    </ReduxProvider>
  );
}

export default App;
