import axios from 'axios';
import {BASE_URL} from '@env';
import {ENDPOINTS} from '../exporter';
import {GetToken} from '../utilities/headers';

// Get all cards
export const cards = async () => {
  const res = await axios.get(`${BASE_URL}${ENDPOINTS.GET_CARDS}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${await GetToken()}`,
    },
  });
  return res.data;
};

// add card
export const createCard = async params => {
  const res = await axios.post(`${BASE_URL}${ENDPOINTS.ADD_CARD}`, params, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${await GetToken()}`,
    },
  });
  return res.data;
};

// update card
export const editCard = async params => {
  const res = await axios.post(`${BASE_URL}${ENDPOINTS.UPDATE_CARD}`, params, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${await GetToken()}`,
    },
  });
  return res.data;
};

// delete card
export const removeCard = async params => {
  const res = await axios.post(`${BASE_URL}${ENDPOINTS.REMOVE_CARD}`, params, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${await GetToken()}`,
    },
  });
  return res.data;
};

// wallet details
export const walletDetails = async () => {
  const res = await axios.get(`${BASE_URL}${ENDPOINTS.WALLET_DETAILS}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${await GetToken()}`,
    },
  });
  return res.data;
};

// get link
export const getLink = async () => {
  console.log(">>>log",`${BASE_URL}${ENDPOINTS.GET_LINK}`);
  const res = await axios.get(`${BASE_URL}${ENDPOINTS.GET_LINK}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${await GetToken()}`,
    },
  });
  return res.data;
};

// top up
export const topUp = async params => {
  const res = await axios.post(`${BASE_URL}${ENDPOINTS.TOP_UP}`, params, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${await GetToken()}`,
    },
  });
  return res.data;
};
// with draw
export const withDraw = async params => {
  const res = await axios.post(`${BASE_URL}${ENDPOINTS.WITH_DRAW}`, params, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${await GetToken()}`,
    },
  });
  return res.data;
};

// default pay method
export const defaultMethod = async params => {
  const res = await axios.post(
    `${BASE_URL}${ENDPOINTS.DEFAULT_PAY_METHOD}`,
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

// add paypal account
export const addPayPalAcc = async params => {
  const res = await axios.post(
    `${BASE_URL}${ENDPOINTS.ADD_PAYPAL_ACCOUNT}`,
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

// save paypal account
export const savePayPalAcc = async params => {
  const res = await axios.post(
    `${BASE_URL}${ENDPOINTS.SAVE_PAYPAL_ACCOUNT}`,
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

// get approval url
export const approvalURL = async () => {
  const res = await axios.get(`${BASE_URL}${ENDPOINTS.GET_APPROVAL_URL}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${await GetToken()}`,
    },
  });
  return res.data;
};

// save paypal res
export const payPalRes = async params => {
  const res = await axios.post(
    `${BASE_URL}${ENDPOINTS.SAVE_PAYPAL_RES}`,
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
