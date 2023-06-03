/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { signIn, signUp } from './authThunk';

const initialState = {
  auth: localStorage.getItem('userData')
    ? JSON.parse(localStorage.getItem('userData'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem('userData');
      state.auth = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, { payload }) => {
        localStorage.setItem('userData', JSON.stringify(payload));
        state.auth = payload;
      });
    builder
      .addCase(signUp.fulfilled, (state, { payload }) => {
        localStorage.setItem('userData', JSON.stringify(payload));
        state.auth = payload;
      });
  },
});

export const { logOut } = authSlice.actions;
export default authSlice.reducer;
