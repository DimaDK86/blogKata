import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { blogApi } from "../../api/blogApi"; // Измененный импорт

// Остальной код остается без изменений

// Async thunks
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await blogApi.login(credentials);
      localStorage.setItem("token", response.data.user.token);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.errors || "Invalid email or password",
      );
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await blogApi.register(userData);
      localStorage.setItem("token", response.data.user.token);
      return response.data.user;
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
      const token = getState().auth.token || localStorage.getItem("token");
      if (!token) {
        localStorage.removeItem("token");
        return rejectWithValue("No authentication token found");
      }

      const response = await blogApi.getCurrentUser(token);
      if (!response.data?.user) {
        localStorage.removeItem("token");
        return rejectWithValue("Invalid user data received");
      }

      return response.data.user;
    } catch (error) {
      localStorage.removeItem("token");
      return rejectWithValue(
        error.response?.data?.errors || "Failed to fetch user",
      );
    }
  },
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUser",
  async (userData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      if (!token) {
        return rejectWithValue("Not authenticated");
      }

      const response = await blogApi.updateUser(userData);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.errors || "Profile update failed",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    isAuthenticated: !!localStorage.getItem("token"),
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.isAuthenticated = false;
      })

      // Registration cases
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.isAuthenticated = false;
      })

      // Fetch current user cases
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })

      // Update profile cases
      .addCase(updateUserProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Action creators
export const { logout, clearAuthError } = authSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthToken = (state) => state.auth.token;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

// Reducer
export default authSlice.reducer;
