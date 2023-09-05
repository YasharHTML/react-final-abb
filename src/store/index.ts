import { configureStore, combineReducers } from "@reduxjs/toolkit";
import  userSlice from "../features/user/userSlice";
import modalSlice from "../features/modal/modalSlice";

const rootReducer = combineReducers({
    user: userSlice,
    modal: modalSlice
});

export const store = configureStore({
    reducer: rootReducer
});


export type RootState = ReturnType<typeof rootReducer>;
