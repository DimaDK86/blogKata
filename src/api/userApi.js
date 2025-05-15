import axios from "axios";

const API = axios.create({
  baseURL: "https://blog-platform.kata.academy/api",
  timeout: 10000, // 10 секунд таймаут
  headers: {
    "Content-Type": "application/json",
  },
});

// Перехватчик для обработки ошибок
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      return Promise.reject({ message: "Request timeout" });
    }
    return Promise.reject(error);
  },
);

/**
 * Логин пользователя
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{user: object}>}
 */
export const login = async (email, password) => {
  try {
    const response = await API.post("/users/login", {
      user: { email, password },
    });
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data);
    throw error.response?.data?.errors || { message: "Login failed" };
  }
};

/**
 * Регистрация нового пользователя
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{user: object}>}
 */
export const register = async (username, email, password) => {
  try {
    const response = await API.post("/users", {
      user: { username, email, password },
    });
    return response.data;
  } catch (error) {
    console.error("Registration error:", error.response?.data);
    throw error.response?.data?.errors || { message: "Registration failed" };
  }
};

/**
 * Получение данных текущего пользователя
 * @param {string} token
 * @returns {Promise<{user: object}>}
 */
export const getCurrentUser = async (token) => {
  try {
    const response = await API.get("/user", {
      headers: { Authorization: `Token ${token}` },
    });
    return response.data;
  } catch (error) {
    // Автоматическая очистка при 401 ошибке
    if (error.response?.status === 401) {
      localStorage.removeItem("user");
    }
    console.error("Fetch user error:", error.response?.data);
    throw error.response?.data?.errors || { message: "Failed to fetch user" };
  }
};

/**
 * Обновление профиля пользователя
 * @param {string} token
 * @param {object} userData
 * @returns {Promise<{user: object}>}
 */
export const updateUser = async (token, userData) => {
  try {
    const response = await API.put(
      "/user",
      { user: userData },
      {
        headers: { Authorization: `Token ${token}` },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Update user error:", error.response?.data);
    throw error.response?.data?.errors || { message: "Failed to update user" };
  }
};

/**
 * Выход из системы (не требует API вызова)
 */
export const logout = () => {
  // Очищаем localStorage на клиенте
  localStorage.removeItem("user");
};

// Дополнительные методы API
export const userApi = {
  login,
  register,
  getCurrentUser,
  updateUser,
  logout,
};
