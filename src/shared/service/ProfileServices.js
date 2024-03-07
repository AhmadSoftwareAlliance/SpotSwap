import axios from 'axios';
import {BASE_URL} from '@env';
import {ENDPOINTS} from '../exporter';
import {GetToken} from '../utilities/headers';

// Get profile
export const userProfile = async () => {
  const res = await axios.get(`${BASE_URL}${ENDPOINTS.GET_PROFILE}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${await GetToken()}`,
    },
  });
  return res.data;
};

// Update profile
export const updateUserProfile = async params => {
  const res = await axios.post(
    `${BASE_URL}${ENDPOINTS.UPDATE_PROFILE}`,
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

// Get car info
export const carInfo = async params => {
  // console.log("get carInfo",`${BASE_URL}${ENDPOINTS.GET_CAR_IFNO}`);
  const res = await axios.post(`${BASE_URL}${ENDPOINTS.GET_CAR_IFNO}`, params, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${await GetToken()}`,
    },
  });
  return res.data;
};

// Update car info
export const carInfoUpdate = async params => {
  const res = await axios.post(
    `${BASE_URL}${ENDPOINTS.UPDATE_CAR_INFO}`,
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

// Get quick chat
export const quickChats = async () => {
  const res = await axios.get(`${BASE_URL}${ENDPOINTS.QUICK_CHATS}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${await GetToken()}`,
    },
  });
  return res.data;
};

// Add quick chat
export const addChat = async params => {
  const res = await axios.post(`${BASE_URL}${ENDPOINTS.ADD_CHAT}`, params, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${await GetToken()}`,
    },
  });
  return res.data;
};

// Edit quick chat
export const editChat = async params => {
  const res = await axios.post(`${BASE_URL}${ENDPOINTS.EDIT_CHAT}`, params, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${await GetToken()}`,
    },
  });
  return res.data;
};

// Remove quick chat
export const removeChat = async chatId => {
  const res = await axios.post(
    `${BASE_URL}${ENDPOINTS.REMOVE_CHAT(chatId)}`,
    {},
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${await GetToken()}`,
      },
    },
  );
  return res.data;
};

//Get static pages
export const staticPagesRes = async endpoint => {
  const res = await axios.get(`${BASE_URL}static_pages/${endpoint}`, {
    headers: {
      Accept: 'application/json',
      Authorization: await GetToken(),
    },
  });
  return res.data;
};

//Get static pages
export const faqs = async () => {
  const res = await axios.get(`${BASE_URL}${ENDPOINTS.GET_FAQS}`, {
    headers: {
      Accept: 'application/json',
    },
  });
  return res.data;
};

//Get support tickets
export const getTickets = async () => {
  const res = await axios.get(`${BASE_URL}${ENDPOINTS.GET_TICKETS}`, {
    headers: {
      Accept: 'application/json',
      Authorization: await GetToken(),
    },
  });
  return res.data;
};

//Create support tickets
export const createTicket = async params => {
  const res = await axios.post(
    `${BASE_URL}${ENDPOINTS.CREATE_TICKET}`,
    params,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: await GetToken(),
      },
    },
  );
  return res.data;
};

//Get support messages
export const getMessages = async params => {
  const res = await axios.post(`${BASE_URL}${ENDPOINTS.SUPPORT_CHAT}`, params, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: await GetToken(),
    },
  });
  return res.data;
};

//Send support message
export const sendMessage = async params => {
  const res = await axios.post(
    `${BASE_URL}${ENDPOINTS.SEND_SUPPORT_MESSAGE}`,
    params,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: await GetToken(),
      },
    },
  );
  return res.data;
};

//Get history
export const getAllHistory = async () => {
  const res = await axios.get(`${BASE_URL}${ENDPOINTS.GET_HISTORY}`, {
    headers: {
      Accept: 'application/json',
      Authorization: await GetToken(),
    },
  });
  return res.data;
};

//Toggle online status
export const toggleStatus = async params => {
  const res = await axios.post(
    `${BASE_URL}${ENDPOINTS.TOGGLE_STATUS}`,
    params,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: await GetToken(),
      },
    },
  );
  return res.data;
};
