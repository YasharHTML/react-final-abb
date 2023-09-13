import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  error: null as string | null,
};

export const getFeedPosts = createAsyncThunk("feed/getFeedPosts", async () => {
  const token = localStorage.getItem("token") || null;

  try {
    const response = await fetch(
      "https://instagram.brightly-shining.cloud/api/v1/user/feed",
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

    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    throw error;
  }
});

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedPosts.pending, (state) => {
        state.error = null;
      })
      .addCase(getFeedPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(getFeedPosts.rejected, (state, action) => {
        state.error = action.error.message ?? null;
      });
  },
});

export default feedSlice.reducer;
