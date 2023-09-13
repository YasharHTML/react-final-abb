import { configureStore, combineReducers } from "@reduxjs/toolkit";
import  userSlice from "../features/user/userSlice";
import modalSlice from "../features/modal/modalSlice";
import authSlice from "../features/auth/authSlice";
import feedSlice from "../features/feed/feedSlice";

const rootReducer = combineReducers({
    auth: authSlice,
    user: userSlice,
    modal: modalSlice,
    feed: feedSlice
});

export const store = configureStore({
    reducer: rootReducer
});


export type RootState = ReturnType<typeof rootReducer>;
