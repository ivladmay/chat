/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import fetchChannels from '../channels/channelsThunk';
import { removeChannel } from '../channels/channelsSlice';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, { payload }) => {
        state.messages = payload.messages;
      });
    builder
      .addCase(removeChannel, (state, { payload }) => {
        state.messages = state.messages.filter((el) => el.channelId !== payload.id);
      });
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
