import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isModalOpen: false
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModal: (state, action) => {
            state.isModalOpen = action.payload;
            
        }
    },
});

export const { setModal } = modalSlice.actions;

export default modalSlice.reducer;