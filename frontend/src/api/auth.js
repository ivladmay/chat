import axios from 'axios';

import { apiRoutes } from '../utils/routes';

export const signInApi = async (values) => {
  const response = await axios.post(apiRoutes.signIn, values);

  return response.data;
};

export const signUpApi = async (values) => {
  const response = await axios.post(apiRoutes.signUp, values);

  return response.data;
};
