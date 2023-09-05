import { configureStore, combineReducers } from "@reduxjs/toolkit";
import  userSlice from "../features/user/userSlice";

const rootReducer = combineReducers({
    user: userSlice
});

export const store = configureStore({
    reducer: rootReducer
});


export type RootState = ReturnType<typeof rootReducer>;
