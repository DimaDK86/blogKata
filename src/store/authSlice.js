import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  login as loginApi,
  register as registerApi,
  getCurrentUser as fetchUserApi,
} from "../api/userApi";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginApi(credentials);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.errors);
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerApi(userData);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.errors);
    }
  },
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user?.token;
      if (!token) return rejectWithValue("No token");

      const response = await fetchUserApi(token);
      return response.data.user;
    } catch (error) {
      localStorage.removeItem("user");
      return rejectWithValue(error.response?.data?.errors);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          action.type.startsWith("auth/") && action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("auth/") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("auth/") && action.type.endsWith("/fulfilled"),
        (state, action) => {
          state.loading = false;
          state.user = action.payload;
        },
      );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
