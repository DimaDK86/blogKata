import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { blogApi } from "../api/blogApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [blogApi.reducerPath]: blogApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogApi.middleware),
});
