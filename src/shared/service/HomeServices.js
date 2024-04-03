import axios from 'axios';
import { BASE_URL } from '@env';
import { ENDPOINTS } from '../exporter';
import { GetToken } from '../utilities/headers';

// Save FCM token
export const saveToken = async params => {
  const res = await axios.post(
    `${BASE_URL}${ENDPOINTS.SAVE_FCM_TOKEN}`,
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

// Create spot
export const createParkingSpot = async params => {
  // try{
  console.log(params, ">>>>spot craete", `${BASE_URL}${ENDPOINTS.CREATE_SPOT}`);
  const res = await axios.post(`${BASE_URL}${ENDPOINTS.CREATE_SPOT}`, params, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${await GetToken()}`,
    },
  });
  console.log("res.data on craete spot", JSON.stringify(res.data, null, 2));
  return res.data;
  // }
  // catch(error) {
  // console.log("error>>>>>>>>>>>",error);
  // return error;
  // }
};

// Get spots
export const getSpots = async params => {
  console.log("getAllSpot>>>", `${BASE_URL}${ENDPOINTS.GET_ALL_SPOTS}`);
  const res = await axios.post(
    `${BASE_URL}${ENDPOINTS.GET_ALL_SPOTS}`,
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

// Get finders
export const getFinders = async params => {
  const res = await axios.post(
    `${BASE_URL}${ENDPOINTS.GET_ALL_FINDERS}`,
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

// Activate spot
export const activateParkingSpot = async params => {
  const res = await axios.post(
    `${BASE_URL}${ENDPOINTS.ACTIVATE_SPOT}`,
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

// Create connection
export const createConnection = async params => {
  const res = await axios.post(
    `${BASE_URL}${ENDPOINTS.CREATE_CONNECTION}`,
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

// Cancel connection
export const cancelConnection = async params => {
  const res = await axios.post(
    `${BASE_URL}${ENDPOINTS.CANCEL_CONNECTION}`,
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

// Create conversation
export const createConvo = async params => {
  const res = await axios.post(
    `${BASE_URL}${ENDPOINTS.CREATE_CONVERSATION}`,
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

// Get conversations
export const getConversations = async () => {
  const res = await axios.get(`${BASE_URL}${ENDPOINTS.GET_CONVERSATIONS}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${await GetToken()}`,
    },
  });
  return res.data;
};

// Delete conversation
export const deleteConversation = async params => {
  const res = await axios.post(
    `${BASE_URL}${ENDPOINTS.DELETE_CONVERSATION}`,
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

// Block/Unblock conversation
export const blockUnblockChat = async params => {
  const res = await axios.post(
    `${BASE_URL}${ENDPOINTS.BLOCK_UNBLOKC_CHAT}`,
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

// Get messages
export const getMessages = async params => {
  const res = await axios.post(`${BASE_URL}${ENDPOINTS.GET_MESSAGES}`, params, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${await GetToken()}`,
    },
  });
  return res.data;
};

// Send message
export const sendMessage = async params => {
  const res = await axios.post(`${BASE_URL}${ENDPOINTS.SEND_MESSAGE}`, params, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${await GetToken()}`,
    },
  });
  return res.data;
};

// Confirm cancel connection
export const confirmCancel = async params => {
  const res = await axios.post(
    `${BASE_URL}${ENDPOINTS.CONFIRM_CANCEL}`,
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

// Transfer parking spot
export const transferSpot = async params => {
  const res = await axios.post(
    `${BASE_URL}${ENDPOINTS.TRANSFER_SPOT}`,
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

// Avail parking spot
export const availSpot = async params => {
  console.log("params", JSON.stringify(params, null, 2));
  try {
    const res = await axios.post(`${BASE_URL}${ENDPOINTS.AVAIL_SPOT}`, params, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${await GetToken()}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log("error", err);
    return err;
  }

};

// Confirm arrival
export const confirmArrivalOfSwapper = async params => {
  const res = await axios.post(
    `${BASE_URL}${ENDPOINTS.CONFIRM_ARRIVAL}`,
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

// Still interested
export const stillWantToAvail = async params => {
  const res = await axios.post(
    `${BASE_URL}${ENDPOINTS.STILL_INSTERESTED}`,
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

// Save swapper loc
export const swapperLoc = async params => {
  const res = await axios.post(`${BASE_URL}${ENDPOINTS.SWAPPER_LOC}`, params, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${await GetToken()}`,
    },
  });
  return res.data;
};
