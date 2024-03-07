import axios from 'axios';
import {BASE_URL} from '@env';
import {ENDPOINTS} from '../exporter';
import {GetToken} from '../utilities/headers';
import { log } from 'react-native-reanimated';

//Authentication Requests
export const loginUser = async params => {
  console.log(params,"123>>>called",`${BASE_URL}${ENDPOINTS.LOGIN}`);
  const res = await axios.post(`${BASE_URL}${ENDPOINTS.LOGIN}`, params, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
  console.log("res",res)
  return res.data;
};

export const socialLogin = async params => {
  console.log("called",params);
  const res = await axios.post(`${BASE_URL}${ENDPOINTS.SOCIAL_LOGIN}`, params, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
  console.log("res",res);
  return res.data;
};

export const profileUpdate = async params => {
  console.log("params on profileupdate>>>>>",JSON.stringify(params,null,2));
  const res = await axios.post(`${BASE_URL}${ENDPOINTS.SOCIAL_USER}`, params, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${await GetToken()}`,
    },
  });
  return res.data;
};

export const registerUser = async params => {
  const res = await axios.post(`${BASE_URL}${ENDPOINTS.REGISTER}`, params, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const carSpecs = async () => {
  console.log("params>>>>> url",`${BASE_URL}${ENDPOINTS.CAR_SPECS}`);
  const res = await axios.get(`${BASE_URL}${ENDPOINTS.CAR_SPECS}`, {
    headers: {
      Accept: 'application/json',
    },
  });
  return res.data;
};

export const carProfile = async params => {
  
  const res = await axios.post(`${BASE_URL}${ENDPOINTS.CAR_PROFILE}`, params, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
  console.log(">>>>>res",res);
  return res.data;
};

export const forgotPassword = async params => {
  console.log("foget",`${BASE_URL}${ENDPOINTS.FORGOT_PASS}`);
  const res = await axios.post(`${BASE_URL}${ENDPOINTS.FORGOT_PASS}`, params, {
    
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
 
  return res.data;
  
};

export const OTPVerify = async params => {
  
  const res = await axios.post(`${BASE_URL}${ENDPOINTS.VERIFY_OTP}`, params, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const resendOTP = async params => {
  const res = await axios.post(`${BASE_URL}${ENDPOINTS.RESEND_OTP}`, params, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const resetPassword = async params => {
  const res = await axios.post(`${BASE_URL}${ENDPOINTS.RESET_PASS}`, params, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.get(`${BASE_URL}${ENDPOINTS.LOGOUT}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${await GetToken()}`,
    },
  });
  return res.data;
};

export const deleteUser = async params => {
  console.log("deleteUser",params);
  const res = await axios.post(
    `${BASE_URL}${ENDPOINTS.DELETE_ACCOUNT}`,
    params,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${await GetToken()}`,
      },
    },
  );
  return res.data;
};
