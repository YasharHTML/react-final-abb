import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isModalOpen: false,
    post: {}
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModal: (state, action) => {
            state.isModalOpen = action.payload.isModalOpen;
            state.post = action.payload.post           
        }
    },
});

export const { setModal } = modalSlice.actions;

export default modalSlice.reducer;