import {takeLatest, put} from 'redux-saga/effects';
import {responseValidator} from '../../../shared/exporter';
import {
  getSpots,
  saveToken,
  availSpot,
  getFinders,
  swapperLoc,
  getMessages,
  sendMessage,
  createConvo,
  transferSpot,
  confirmCancel,
  blockUnblockChat,
  getConversations,
  createConnection,
  cancelConnection,
  stillWantToAvail,
  createParkingSpot,
  deleteConversation,
  activateParkingSpot,
  confirmArrivalOfSwapper,
} from '../../../shared/service/HomeServices';
import * as types from '../../actions/types/home_types';

// ************* Save FCM Token Saga **************
export function* saveFCMTokenReq() {
  yield takeLatest(types.SAVE_FCM_TOKEN_REQUEST, saveFCMToken);
}
function* saveFCMToken(params) {
  try {
    const res = yield saveToken(params?.params);
    if (res) {
      yield put({
        type: types.SAVE_FCM_TOKEN_REQUEST_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.SAVE_FCM_TOKEN_REQUEST_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Create Spot Saga **************
export function* createSpotReq() {
  yield takeLatest(types.CREATE_SPOT_REQUEST, createSpot);
}
function* createSpot(params) {
  try {
    const res = yield createParkingSpot(params?.params);
    console.log("res on home sada acraete spot",JSON.stringify(res,null,2))
    if (res) {
      yield put({
        type: types.CREATE_SPOT_REQUEST_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    console.log(">>>>>>>error on hone sahr create spot",error);
    yield put({
      type: types.CREATE_SPOT_REQUEST_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Get All Spots Saga **************
export function* getAllSpotsReq() {
  yield takeLatest(types.GET_ALL_SPOTS_REQUEST, getAllSpots);
}
function* getAllSpots(params) {
  try {
    const res = yield getSpots(params?.params);
    if (res) {
      yield put({
        type: types.GET_ALL_SPOTS_REQUEST_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.GET_ALL_SPOTS_REQUEST_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Get All Finders Saga **************
export function* getAllFindersReq() {
  yield takeLatest(types.GET_ALL_FINDERS_REQ, getAllFinders);
}
function* getAllFinders(params) {
  try {
    const res = yield getFinders(params?.params);
    if (res) {
      yield put({
        type: types.GET_ALL_FINDERS_REQ_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.GET_ALL_FINDERS_REQ_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Activate Spot Saga **************
export function* activateSpotReq() {
  yield takeLatest(types.ACTIVATE_SPOT_REQUEST, activateSpot);
}
function* activateSpot(params) {
  try {
    const res = yield activateParkingSpot(params?.params);
    if (res) {
      yield put({
        type: types.ACTIVATE_SPOT_REQUEST_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.ACTIVATE_SPOT_REQUEST_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Create Connection Saga **************
export function* createConnectionRequest() {
  yield takeLatest(types.CREATE_CONNECTION_REQ, createConnectionReq);
}
function* createConnectionReq(params) {
  try {
    const res = yield createConnection(params?.params);
    if (res) {
      yield put({
        type: types.CREATE_CONNECTION_REQ_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.CREATE_CONNECTION_REQ_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Cancel Connection Saga **************
export function* cancelConnectionRequest() {
  yield takeLatest(types.CANCEL_CONNECTION_REQ, cancelConnectionReq);
}
function* cancelConnectionReq(params) {
  try {
    const res = yield cancelConnection(params?.params);
    if (res) {
      yield put({
        type: types.CANCEL_CONNECTION_REQ_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.CANCEL_CONNECTION_REQ_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Create Conversations Saga **************
export function* createConversationRequest() {
  yield takeLatest(types.CREATE_CONVERSATION_REQ, createConversationReq);
}
function* createConversationReq(params) {
  try {
    const res = yield createConvo(params?.params);
    if (res) {
      yield put({
        type: types.CREATE_CONVERSATION_REQ_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.CREATE_CONVERSATION_REQ_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Get Conversations Saga **************
export function* getConversationsRequest() {
  yield takeLatest(types.GET_CONVERSATIONS_REQ, getConversationsReq);
}
function* getConversationsReq(params) {
  try {
    const res = yield getConversations(params?.params);
    if (res) {
      yield put({
        type: types.GET_CONVERSATIONS_REQ_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.GET_CONVERSATIONS_REQ_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Delete Conversation Saga **************
export function* deleteConversationRequest() {
  yield takeLatest(types.DELETE_CONVERSATION_REQ, deleteConversationReq);
}
function* deleteConversationReq(params) {
  try {
    const res = yield deleteConversation(params?.params);
    if (res) {
      yield put({
        type: types.DELETE_CONVERSATION_REQ_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.DELETE_CONVERSATION_REQ_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Block/Unblock Chat Saga **************
export function* blockUnblockChatRequest() {
  yield takeLatest(types.BLOCK_UNBLOCK_CHAT_REQ, blockUnblockChatReq);
}
function* blockUnblockChatReq(params) {
  try {
    const res = yield blockUnblockChat(params?.params);
    if (res) {
      yield put({
        type: types.BLOCK_UNBLOCK_CHAT_REQ_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.BLOCK_UNBLOCK_CHAT_REQ_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Get Messages Saga **************
export function* getMessagesRequest() {
  yield takeLatest(types.GET_MESSAGES_REQUEST, getMessagesReq);
}
function* getMessagesReq(params) {
  try {
    const res = yield getMessages(params?.params);
    if (res) {
      yield put({
        type: types.GET_MESSAGES_REQUEST_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.GET_MESSAGES_REQUEST_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Send Messages Saga **************
export function* sendMessageRequest() {
  yield takeLatest(types.SEND_MESSAGE_REQUEST, sendMessagesReq);
}
function* sendMessagesReq(params) {
  try {
    const res = yield sendMessage(params?.params);
    if (res) {
      yield put({
        type: types.SEND_MESSAGE_REQUEST_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.SEND_MESSAGE_REQUEST_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Confirm Cancel Connection Saga **************
export function* confirmCancelConnectionReq() {
  yield takeLatest(
    types.CONFIRM_CANCEL_CONNECTION_REQ,
    confirmCancelConnection,
  );
}
function* confirmCancelConnection(params) {
  try {
    const res = yield confirmCancel(params?.params);
    if (res) {
      yield put({
        type: types.CONFIRM_CANCEL_CONNECTION_REQ_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.CONFIRM_CANCEL_CONNECTION_REQ_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Transfer Parking Spot Saga **************
export function* transferParkingSpotReq() {
  yield takeLatest(types.TRANSFER_PARKING_SPOT_REQ, transferParkingSpot);
}
function* transferParkingSpot(params) {
  try {
    const res = yield transferSpot(params?.params);
    if (res) {
      yield put({
        type: types.TRANSFER_PARKING_SPOT_REQ_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.TRANSFER_PARKING_SPOT_REQ_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Avail Parking Spot Saga **************
export function* availParkingSpotReq() {
  yield takeLatest(types.AVAIL_PARKING_SPOT_REQ, availParkingSpot);
}
function* availParkingSpot(params) {
  try {
    const res = yield availSpot(params?.params);
    if (res) {
      yield put({
        type: types.AVAIL_PARKING_SPOT_REQ_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.AVAIL_PARKING_SPOT_REQ_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Confirm Arrival Saga **************
export function* confirmArrivalReq() {
  yield takeLatest(types.CONFIRM_ARRIVAL_REQ, confirmArrival);
}
function* confirmArrival(params) {
  try {
    const res = yield confirmArrivalOfSwapper(params?.params);
    if (res) {
      yield put({
        type: types.CONFIRM_ARRIVAL_REQ_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.CONFIRM_ARRIVAL_REQ_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Still Interested Saga **************
export function* stillInterestedReq() {
  yield takeLatest(types.STILL_INSTERESTED_REQ, stillInterested);
}
function* stillInterested(params) {
  try {
    const res = yield stillWantToAvail(params?.params);
    if (res) {
      yield put({
        type: types.STILL_INSTERESTED_REQ_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.STILL_INSTERESTED_REQ_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Save Swapper Loc Saga **************
export function* saveSwapperLocReq() {
  yield takeLatest(types.SAVE_SWAPPER_LOC_REQ, saveSwapperLoc);
}
function* saveSwapperLoc(params) {
  try {
    const res = yield swapperLoc(params?.params);
    if (res) {
      yield put({
        type: types.SAVE_SWAPPER_LOC_REQ_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    console.log('Error ==> ', error);
    yield put({
      type: types.SAVE_SWAPPER_LOC_REQ_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}
