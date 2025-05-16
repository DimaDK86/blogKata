import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice"; // 👈 Подключаем базовый API
import authReducer from "./auth/authSlice"; // 👈 Оставляем только локальное состояние (токен, user)

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // 👈 Добавляем редюсер RTK Query
    auth: authReducer, // 👈 Оставляем auth reducer (без thunks)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // 👈 Добавляем middleware RTK Query
});
