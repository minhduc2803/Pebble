import { tranformObjectKeys } from 'app/utils/objectUtils';
import axios from 'axios';
import _ from 'lodash';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
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
