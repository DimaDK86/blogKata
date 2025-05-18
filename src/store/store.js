import { configureStore } from "@reduxjs/toolkit";
import { blogApi } from "../api/blogApi";
import authReducer from "./slices/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [blogApi.reducerPath]: blogApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["auth/updateUser/fulfilled"],
        ignoredPaths: ["auth.user.image"],
      },
    }).concat(blogApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

// Включение refetchOnFocus/refetchOnReconnect
setupListeners(store.dispatch);
