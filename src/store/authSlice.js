import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  authUser as loginApi,
  createUser as registerApi,
  getCurrentUser as fetchUserApi,
  updateUserProfile as updateUserApi,
} from "../../api/userApi";

// Асинхронные действия
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await loginApi(email, password);
      const user = response.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.errors || "Login failed");
    }
  },
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const response = await registerApi(username, email, password);
      const user = response.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.errors || "Registration failed",
      );
    }
  },
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user?.token;
      if (!token) {
        localStorage.removeItem("user");
        return rejectWithValue("No token found");
      }

      const response = await fetchUserApi(token);
      return response.data.user;
    } catch (error) {
      localStorage.removeItem("user");
      return rejectWithValue(
        error.response?.data?.errors || "Failed to fetch user",
      );
    }
  },
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (userData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user?.token;
      const response = await updateUserApi(token, userData);
      const user = response.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.errors || "Failed to update profile",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
    initialized: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("user");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
      state.error = null;
    };

    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload;
    };

    // Общий обработчик для всех успешных auth-запросов
    const handleAuthFulfilled = (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.initialized = true;
    };

    builder
      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, handleAuthFulfilled)
      .addCase(login.rejected, handleRejected)

      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, handleAuthFulfilled)
      .addCase(register.rejected, handleRejected)

      .addCase(fetchCurrentUser.pending, handlePending)
      .addCase(fetchCurrentUser.fulfilled, handleAuthFulfilled)
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.initialized = true; // Важно пометить как инициализированное даже при ошибке
      })

      .addCase(updateUser.pending, handlePending)
      .addCase(updateUser.fulfilled, handleAuthFulfilled)
      .addCase(updateUser.rejected, handleRejected);
  },
});

export const { logout, clearError } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthInitialized = (state) => state.auth.initialized;

export default authSlice.reducer;
