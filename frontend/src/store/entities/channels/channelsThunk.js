import { createAsyncThunk } from '@reduxjs/toolkit';

import getChannelsApi from '../../../api/channels';

const fetchChannels = createAsyncThunk(
  'fetchChannels',
  (token) => getChannelsApi(token),
);

export default fetchChannels;
