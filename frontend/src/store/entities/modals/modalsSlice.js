/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modals: {
    isShown: false,
    type: '',
    target: null,
  },
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      const { type, target } = payload;

      state.modals.isShown = true;
      state.modals.type = type;
      state.modals.target = target;
    },
    closeModal: (state) => {
      state.modals.isShown = false;
      state.modals.type = '';
      state.modals.target = null;
    },
  },
});

export const { openModal, closeModal } = modalsSlice.actions;
export default modalsSlice.reducer;
