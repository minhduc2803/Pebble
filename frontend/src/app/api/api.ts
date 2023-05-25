import { tranformObjectKeys } from 'app/utils/objectUtils';
import axios from 'axios';
import _ from 'lodash';

const api = axios.create();

api.interceptors.request.use(config => {
  if (config.data) {
    config.data = tranformObjectKeys(config.data, _.snakeCase);
  }
  return config;
});

api.interceptors.response.use(response => {
  response.data = tranformObjectKeys(response.data, _.camelCase);
  response.headers = tranformObjectKeys(response.headers, _.camelCase);
  return response;
});

export default api;
