import * as TYPES from '../types/profile_types';

//Get Profile
export const getProfileRequest = (cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_PROFILE_REQUEST,
    cbSuccess,
    cbFailure,
  };
};

//Update Profile Request
export const updateProfileRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.UPDATE_PROFILE_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Get car info
export const getCarInfoRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_CAR_INFO_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//update car info
export const updateCarInfoRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.UPADTE_CAR_INFO_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Get quick chats
export const getQuickChatsRequest = (cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_QUICK_CHATS_REQUEST,
    cbSuccess,
    cbFailure,
  };
};

//Add quick chat
export const addQuickChatRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.ADD_QUICK_CHAT_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Edit quick chat
export const editQuickChatRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.EDIT_QUICK_CHAT_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Remove quick chat
export const removeQuickChatRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.REMOVE_QUICK_CHAT_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Get static pages data
export const staticPagesRequest = (params, cbSuccess, cbFailure) => {
  console.log("params",params);
  return {
    type: TYPES.STATIC_PAGES_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Get faqs
export const getFaqsRequest = (cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_FAQS_REQUEST,
    cbSuccess,
    cbFailure,
  };
};

//Get support tickets
export const getSupportTicketsRequest = (cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_SUPPORT_TICKETS_REQUEST,
    cbSuccess,
    cbFailure,
  };
};

//Create support ticket
export const createSupportTicketRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.CREATE_SUPPORT_TICKETS_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Get support messages
export const getSupportMessagesRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_SUPPORT_MESSAGES_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Send support message
export const sendSupportMessageRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.SEND_SUPPORT_MESSAGE_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Get history
export const getHistoryRequest = (cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_HISTORY_REQUEST,
    cbSuccess,
    cbFailure,
  };
};

//Toggle online status
export const toggleOnlineStatusRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.TOGGLE_ONLINE_STATUS_REQ,
    params,
    cbSuccess,
    cbFailure,
  };
};
