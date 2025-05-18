import axios from "axios";
import { store } from "../store/store";

const API_URL = "https://blog-platform.kata.academy/api";

// Создаем основной экземпляр API
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Интерцептор для добавления токена
api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// Интерцептор для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch({ type: "auth/logout" });
    }
    return Promise.reject(error);
  },
);

// Методы API
export const authAPI = {
  login: (credentials) => api.post("/users/login", { user: credentials }),
  register: (userData) => api.post("/users", { user: userData }),
  getCurrentUser: () => api.get("/user"),
  updateUser: (userData) => api.put("/user", { user: userData }),
};

export const articlesAPI = {
  getArticles: (params) => api.get("/articles", { params }),
  getArticle: (slug) => api.get(`/articles/${slug}`),
  createArticle: (articleData) =>
    api.post("/articles", { article: articleData }),
  updateArticle: (slug, articleData) =>
    api.put(`/articles/${slug}`, { article: articleData }),
  deleteArticle: (slug) => api.delete(`/articles/${slug}`),
  favoriteArticle: (slug) => api.post(`/articles/${slug}/favorite`),
  unfavoriteArticle: (slug) => api.delete(`/articles/${slug}/favorite`),
};

export const commentsAPI = {
  getComments: (slug) => api.get(`/articles/${slug}/comments`),
  addComment: (slug, body) =>
    api.post(`/articles/${slug}/comments`, { comment: { body } }),
  deleteComment: (slug, id) => api.delete(`/articles/${slug}/comments/${id}`),
};

export const profileAPI = {
  getProfile: (username) => api.get(`/profiles/${username}`),
  followUser: (username) => api.post(`/profiles/${username}/follow`),
  unfollowUser: (username) => api.delete(`/profiles/${username}/follow`),
};

export const tagsAPI = {
  getTags: () => api.get("/tags"),
};

export default api;
