import { configureStore } from "@reduxjs/toolkit";
import { blogApi } from "../api/blogApi";
import auth from "./authSlice";

export const store = configureStore({
  reducer: {
    auth,
    [blogApi.reducerPath]: blogApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(blogApi.middleware),
});
