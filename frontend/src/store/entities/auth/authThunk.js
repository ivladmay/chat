import { createAsyncThunk } from '@reduxjs/toolkit';

import signInApi from '../../../api/auth';

const signIn = createAsyncThunk(
  'signIn',
  (values) => signInApi(values),
);

export default signIn;
