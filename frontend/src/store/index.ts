import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

import checklistsApi from "@/api";
import authReducer from "@/modules/auth/store/auth-slice";
import tasksReducer from "@/modules/tasks/store/tasks-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    [checklistsApi.reducerPath]: checklistsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(checklistsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
