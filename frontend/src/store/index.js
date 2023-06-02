import { configureStore } from '@reduxjs/toolkit';

import authReducer from './entities/auth/authSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
