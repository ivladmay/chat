import axios from 'axios';

import { apiRoutes } from '../utils/routes';

const signInApi = async (values) => {
  const response = await axios.post(apiRoutes.signIn, values);

  return response.data;
};

export default signInApi;
