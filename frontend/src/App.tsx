import { RouterProvider } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { Toaster } from "sonner";

import { store, useAppSelector } from "@/store";
import { useGetRootQuery } from "@/api";

import { publicRouter, privateRouter } from "@/routes";

function AppRouter() {
  const { data: _ } = useGetRootQuery();

  const user = useAppSelector((state) => state.auth.user);

  const appRouter = user ? privateRouter : publicRouter;

  return <RouterProvider router={appRouter} />;
}

function App() {
  return (
    <ReduxProvider store={store}>
      <AppRouter />
      <Toaster expand richColors />
    </ReduxProvider>
  );
}

export default App;
