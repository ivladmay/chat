/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import signIn from './authThunk';

const initialState = {
  auth: localStorage.getItem('userData')
    ? JSON.parse(localStorage.getItem('userData'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, { payload }) => {
        localStorage.setItem('userData', JSON.stringify(payload));
        state.auth = payload;
      });
  },
});

export default authSlice.reducer;
