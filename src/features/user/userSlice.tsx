import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../../models/UserData";
import { Subscribers } from "../../models/Subscriber";

interface Response {
  success: string;
  data: UserData;
}

const initialState = {
  user: {} as UserData,
  loading: true,
  error: null as string | null,
  subscribers: [] as Subscribers[],
};

export const fetchUser = createAsyncThunk<UserData, any>(
  "user/fetchUser",
  async (username?: string) => {
    const token = localStorage.getItem("token") || null;

    try {
      const response = await fetch(
        `https://instagram.brightly-shining.cloud/api/v1/user?username=${username ?? localStorage.getItem("username")}`,
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

export const subscribe = createAsyncThunk(
  "user/subscribe",
  async (user: Subscribers) => {
    try {
      const token = localStorage.getItem("token") || null;

      const response = await fetch(
        "https://instagram.brightly-shining.cloud/api/v1/user/subscription",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(user),
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

export const unsubscribe = createAsyncThunk(
  "user/unsubscribe",
  async (username: string) => {
    const token = localStorage.getItem("token") || null;

    try {
      const response = await fetch(
        `https://instagram.brightly-shining.cloud/api/v1/user/subscription?username=${username}`,
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

export 

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
      })
      .addCase(subscribe.fulfilled, (state, action) => {
        state.subscribers = action.payload;
      })
      .addCase(unsubscribe.fulfilled, (state, action) => {
        state.subscribers = state.user.subscribers.filter(
          (subscriber) => subscriber.username !== action.payload.username
        );
      });
  },
});

export default userSlice.reducer;
