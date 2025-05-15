import axios from "axios";

const API = axios.create({
  baseURL: "https://blog-platform.kata.academy/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Универсальный обработчик запросов
const makeRequest = async (config) => {
  try {
    const response = await API(config);
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error.response?.data?.errors || { message: "Request failed" };
  }
};

// Основные API методы
export const authUser = (email, password) =>
  makeRequest({
    url: "/users/login",
    method: "POST",
    data: { user: { email, password } },
  });

export const createUser = (username, email, password) =>
  makeRequest({
    url: "/users",
    method: "POST",
    data: { user: { username, email, password } },
  });

export const getCurrentUser = (token) =>
  makeRequest({
    url: "/user",
    method: "GET",
    headers: { Authorization: `Token ${token}` },
  });

export const updateUserProfile = (token, userData) =>
  makeRequest({
    url: "/user",
    method: "PUT",
    headers: { Authorization: `Token ${token}` },
    data: { user: userData },
  });
