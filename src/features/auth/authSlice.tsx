import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  username: localStorage.getItem("username") || null,
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

      const responseData: any = await response.json();
      if (responseData && responseData.token) {
        const token = responseData.token;
        const username = credentials.username;
        localStorage.setItem("username", username);
        localStorage.setItem("token", token);
        return { token, username };
      }
    } catch (error) {
      throw error;
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (credentials: {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    try {
      const response = await fetch(
        "https://instagram.brightly-shining.cloud/api/v1/auth/register",
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

      const responseData: any = await response.json();
      if (responseData && responseData.token) {
        const token = responseData.token;
        const username = credentials.username;
        localStorage.setItem("username", username);
        localStorage.setItem("token", token);
        return { token, username };
      }
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
      localStorage.removeItem("username");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.token = action.payload.token;
        state.username = action.payload.username;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message ?? null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.token = action.payload.token;
        state.username = action.payload.username;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message ?? null;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
