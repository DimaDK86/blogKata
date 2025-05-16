import { configureStore } from "@reduxjs/toolkit";
import { postApi } from "../api/postApi.js";
import authReducer from "./authSlice/authSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
});
