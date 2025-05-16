// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { blogApi } from "../api/blogApi"; // Добавьте этот импорт

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [blogApi.reducerPath]: blogApi.reducer, // Добавьте редьюсер API
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogApi.middleware), // Добавьте middleware
});
