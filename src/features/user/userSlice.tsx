import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface Response {
  success: string;
  data: UserData;
}

export interface Comments {
  commentId: string;
  authorUsername: string;
  text: string;
}

interface Likes {
  authorUsername: string;
}

export interface Post {
  authorUsername: string;
  postId: string;
  caption: string;
  imageUrl: string;
  comments: Comments[];
  likes: Likes[];
  location: string;
  timestamp: number;
}

export interface UserData {
  username: string;
  firstName: string;
  lastName: string;
  posts: Post[];
  subscriptions: string[];
  subscribers: any[];
}

export const fetchUser = createAsyncThunk<UserData, any>(
  "user/fetchUser",
  async (username: string) => {
    const token = localStorage.getItem('token') || null;

    try {
      const response = await fetch(
        `https://instagram.brightly-shining.cloud/api/v1/user?username=${username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error");
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
  loading: true,
  error: null as string | null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUser.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.loading = false;
          state.user = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export default userSlice.reducer;
