import { createAsyncThunk } from '@reduxjs/toolkit';

import { signInApi, signUpApi } from '../../../api/auth';

export const signIn = createAsyncThunk(
  'signIn',
  (values) => signInApi(values),
);

export const signUp = createAsyncThunk(
  'signUp',
  (values) => signUpApi(values),
);
