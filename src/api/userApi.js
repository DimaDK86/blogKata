import axios from "axios";

const api = axios.create({
  baseURL: "https://blog.kata.academy/api",
});

export const register = (userData) => api.post("/users", { user: userData });

export const login = (credentials) =>
  api.post("/users/login", { user: credentials });

export const getCurrentUser = (token) =>
  api.get("/user", {
    headers: { Authorization: `Token ${token}` },
  });

export const updateUser = (userData, token) =>
  api.put(
    "/user",
    { user: userData },
    {
      headers: { Authorization: `Token ${token}` },
    },
  );
