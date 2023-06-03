/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import fetchChannels from './channelsThunk';

const initialState = {
  channels: [],
  currentChannelId: 1,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: (state, { payload }) => {
      state.channels.push(payload);
    },
    switchChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    removeChannel: (state, { payload }) => {
      state.channels = state.channels.filter((el) => el.id !== payload.id);
      if (state.currentChannelId === payload.id) {
        state.currentChannelId = 1;
      }
    },
    renameChannel: (state, { payload }) => {
      const { id, name } = payload;

      state.channels = state.channels.map((el) => (el.id === id ? { ...el, name } : el));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, { payload }) => {
        state.channels = payload.channels;
        state.currentChannelId = payload.currentChannelId;
      });
  },
});

export const {
  addChannel,
  switchChannel,
  removeChannel,
  renameChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
