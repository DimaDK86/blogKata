import axios from "axios";

const API_URL = "https://blog-platform.kata.academy/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = (email, password) =>
  api.post("/users/login", { user: { email, password } });

export const register = (username, email, password) =>
  api.post("/users", { user: { username, email, password } });

export const getCurrentUser = (token) =>
  api.get("/user", {
    headers: { Authorization: `Token ${token}` },
  });

export const updateUser = (token, userData) =>
  api.put(
    "/user",
    { user: userData },
    {
      headers: { Authorization: `Token ${token}` },
    },
  );
