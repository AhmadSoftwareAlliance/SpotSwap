import * as TYPES from '../types/home_types';

// Save FCM token
export const saveFCMTokenReq = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.SAVE_FCM_TOKEN_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

// Create spot
export const createSpotReq = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.CREATE_SPOT_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

// Get all spots
export const getAllSpotsReq = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_ALL_SPOTS_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

// Get all finders
export const getAllFindersReq = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_ALL_FINDERS_REQ,
    params,
    cbSuccess,
    cbFailure,
  };
};

// Activate Spot
export const activateSpotReq = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.ACTIVATE_SPOT_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

// Create connection
export const createConnectionRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.CREATE_CONNECTION_REQ,
    params,
    cbSuccess,
    cbFailure,
  };
};

// Cancel connection
export const cancelConnectionRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.CANCEL_CONNECTION_REQ,
    params,
    cbSuccess,
    cbFailure,
  };
};

// Create conversation
export const createConversationRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.CREATE_CONVERSATION_REQ,
    params,
    cbSuccess,
    cbFailure,
  };
};

// Get conversations
export const getConversationsRequest = (cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_CONVERSATIONS_REQ,
    cbSuccess,
    cbFailure,
  };
};

// Delete conversation
export const deleteConversationRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.DELETE_CONVERSATION_REQ,
    params,
    cbSuccess,
    cbFailure,
  };
};

// Bolck/Unblock chat
export const blockUnblockChatRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.BLOCK_UNBLOCK_CHAT_REQ,
    params,
    cbSuccess,
    cbFailure,
  };
};

// Get messages
export const getMessagesRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_MESSAGES_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

// Send message
export const sendMessageRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.SEND_MESSAGE_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

// Confirm cancel connection
export const confirmCancelConnectionReq = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.CONFIRM_CANCEL_CONNECTION_REQ,
    params,
    cbSuccess,
    cbFailure,
  };
};

// Transfer parking spot
export const transferParkingSpotReq = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.TRANSFER_PARKING_SPOT_REQ,
    params,
    cbSuccess,
    cbFailure,
  };
};

// Avail parking spot
export const availParkingSpotReq = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.AVAIL_PARKING_SPOT_REQ,
    params,
    cbSuccess,
    cbFailure,
  };
};

// Confirm arrival
export const confirmArrivalReq = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.CONFIRM_ARRIVAL_REQ,
    params,
    cbSuccess,
    cbFailure,
  };
};

// Still interested
export const stillInterestedReq = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.STILL_INSTERESTED_REQ,
    params,
    cbSuccess,
    cbFailure,
  };
};

// Save swapper loc
export const saveSwapperLocReq = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.SAVE_SWAPPER_LOC_REQ,
    params,
    cbSuccess,
    cbFailure,
  };
};
