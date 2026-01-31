import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  content: null,
  type: 'movie', 
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { content, type = 'movie' } = action.payload;
      state.isOpen = true;
      state.content = content;
      state.type = type;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.content = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
