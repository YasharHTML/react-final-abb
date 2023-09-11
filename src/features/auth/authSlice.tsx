import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getStateFromLocalStorage } from "../../utils";

const initialState = {
  token: getStateFromLocalStorage("token") || null,
  error: null as string | null,
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials: { username: string; password: string }) => {
    try {
      const response = await fetch(
        "https://instagram.brightly-shining.cloud/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) {
        throw new Error("Error");
      }

      const responseData: any = await response.text();
      return responseData;
    } catch (error) {
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload;
        localStorage.setItem("token", action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message ?? null;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
