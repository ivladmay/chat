import { configureStore } from '@reduxjs/toolkit';

import channelsReducer from './entities/channels/channelsSlice';
import messagesReducer from './entities/messages/messagesSlice';
import modalsReducer from './entities/modals/modalsSlice';
import authReducer from './entities/auth/authSlice';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modals: modalsReducer,
    auth: authReducer,
  },
});
