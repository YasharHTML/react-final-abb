import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post } from "../../models/Post";

const initialState = {
  post: {
    comments: [] as {
      authorUsername: string;
      commentId: string;
      text: string;
    }[],
    likes: [] as {
      authorUsername: string;
    }[],
  } as Post,
  isLiked: {} as Record<string, boolean>,
};

export const likePost = createAsyncThunk(
  "post/likePost",
  async (postId: string) => {
    const token = localStorage.getItem("token") || null;

    try {
      const response = await fetch(
        "https://instagram.brightly-shining.cloud/api/v1/post/like",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ postId }),
        }
      );

      if (!response.ok) {
        throw new Error("Error");
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw error;
    }
  }
);

export const removeLike = createAsyncThunk(
  "post/removeLike",
  async (postId: string) => {
    const token = localStorage.getItem("token") || null;

    try {
      const response = await fetch(
        `https://instagram.brightly-shining.cloud/api/v1/post/like?postId=${postId}`,
        {
          method: "DELETE",
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
      return responseData;
    } catch (error) {
      throw error;
    }
  }
);

export const addComment = createAsyncThunk(
  "post/addComment",
  async (comment: { postId: string; text: string }) => {
    const token = localStorage.getItem("token") || null;

    try {
      const response = await fetch(
        "https://instagram.brightly-shining.cloud/api/v1/post/comment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(comment),
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
  }
);

export const deleteComment = createAsyncThunk(
  "post/deleteComment",
  async (commentId: string) => {
    const token = localStorage.getItem("token") || null;

    try {
      const response = await fetch(
        `https://instagram.brightly-shining.cloud/api/v1/post/comment?commentId=${commentId}`,
        {
          method: "DELETE",
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
      return responseData;
    } catch (error) {
      throw error;
    }
  }
);

export const addPost = createAsyncThunk("post/addPost", 
async (post: { imageUrl: any; caption: string; location: string }) => {
  const token = localStorage.getItem("token") || null;

  try {
    const response = await fetch(
      "https://instagram.brightly-shining.cloud/api/v1/post",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(post),
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

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (postId: string) => {
    const token = localStorage.getItem("token") || null;

    try {
      const response = await fetch(
        `https://instagram.brightly-shining.cloud/api/v1/post?postId=${postId}`,
        {
          method: "DELETE",
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
      return responseData;
    } catch (error) {
      throw error;
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(likePost.fulfilled, (state, action) => {
        const { postId, responseData } = action.payload;
        state.isLiked[postId] = true;
        state.post = responseData;
      })
      .addCase(removeLike.fulfilled, (state, action) => {
        const { postId, responseData } = action.payload;
        state.isLiked[postId] = false;
        state.post = responseData;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.post.comments = action.payload;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.post.comments = action.payload;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.post = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.post = action.payload;
      });
  },
});

export default postSlice.reducer;
