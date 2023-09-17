import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Post } from "../../models/Post";

interface PostModal {
    isModalOpen: boolean;
    post: Post | null;
}

const initialState: PostModal = {
    isModalOpen: false,
    post: null,
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setModal: (state, action: PayloadAction<PostModal>) => {
            state.isModalOpen = action.payload.isModalOpen;
            state.post = action.payload.post;
        },
    },
});

export const { setModal } = modalSlice.actions;

export default modalSlice.reducer;
