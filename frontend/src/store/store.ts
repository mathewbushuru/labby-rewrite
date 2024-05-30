import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

import authReducer from "@/store/features/auth-slice";
// import acmeAdminApi from "@/api";

export const store = configureStore({
  reducer: {
    adminAuth: authReducer,
    // [acmeAdminApi.reducerPath]: acmeAdminApi.reducer,
  },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(acmeAdminApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;