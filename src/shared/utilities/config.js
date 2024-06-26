import axios from 'axios';
import {BASE_URL} from '@env';
import store from '../../redux/store';

const HTTP_CLIENT = axios.create({
  baseURL: BASE_URL,
});

const initialConfig = () => {
  setupAxios();
};

const setupAxios = () => {
  HTTP_CLIENT.interceptors.request.use(
    config => {
      const {userInfo} = store.getState().auth;
      if (userInfo?.token) {
        config.headers.auth_token = `Bearer ${userInfo?.token}`;
      }
      return config;
    },
    err => Promise.reject(err),
  );
};

export {HTTP_CLIENT, setupAxios, initialConfig};
