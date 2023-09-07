import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Response {
  success: string;
  data: UserData;
}

interface UserData {
  username:  any;
  firstName: string;
  lastName: string;
  posts: [];
  subscriptions: [];
  subscribers: [];
}


export const fetchUser = createAsyncThunk<UserData, any>(
  "user/fetchUser",
  async (username: any) => {
    try {
      const response = await fetch(
        `https://instagram.brightly-shining.cloud/api/v1/user?username=${username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer ec8bd96c25fb46319cdf49779182333c",
          },
        }
      );

      if (!response.ok) {
        throw new Error('Error');
      }

      const responseData: Response = await response.json();

      return responseData.data;
      
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  user: {} as UserData,
  loading: true
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;

      });
  },
});

export default userSlice.reducer;
