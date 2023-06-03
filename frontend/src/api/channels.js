import axios from 'axios';

import { apiRoutes } from '../utils/routes';

const getChannelsApi = async (token) => {
  const response = await axios
    .get(apiRoutes.channels, { headers: { Authorization: `Bearer ${token}` } });

  return response.data;
};

export default getChannelsApi;
