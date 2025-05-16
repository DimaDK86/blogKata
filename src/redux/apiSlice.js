import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://jsonplaceholder.typicode.com"; // 👈 Замени на свой API URL

export const apiSlice = createApi({
  reducerPath: "api", // 👈 Название редюсера (должно совпадать с store)
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: () => ({}), // 👈 Пока пусто, endpoints добавим в других файлах
});
