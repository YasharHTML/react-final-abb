import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials: { username: string; password: any }) => {
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload;
        localStorage.setItem("token", action.payload);
      })
    
  },
});

export default authSlice.reducer;
