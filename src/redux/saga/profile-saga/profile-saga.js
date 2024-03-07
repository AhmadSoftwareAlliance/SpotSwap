import { takeLatest, put } from 'redux-saga/effects';
import { responseValidator } from '../../../shared/exporter';
import {
  faqs,
  addChat,
  carInfo,
  editChat,
  getTickets,
  quickChats,
  removeChat,
  getMessages,
  sendMessage,
  userProfile,
  toggleStatus,
  createTicket,
  getAllHistory,
  carInfoUpdate,
  staticPagesRes,
  updateUserProfile,
} from '../../../shared/service/ProfileServices';
import * as types from '../../actions/types/profile_types';

// ************* Get Profile Saga **************
export function* getProfileRequest() {
  yield takeLatest(types.GET_PROFILE_REQUEST, getProfile);
}
function* getProfile(params) {
  try {
    const res = yield userProfile();
    if (res) {
      yield put({
        type: types.GET_PROFILE_REQUEST_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.GET_PROFILE_REQUEST_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Update Profile Saga **************
export function* updateProfileRequest() {
  yield takeLatest(types.UPDATE_PROFILE_REQUEST, updateProfile);
}
function* updateProfile(params) {
  try {
    const res = yield updateUserProfile(params?.params);
    if (res) {
      yield put({
        type: types.UPDATE_PROFILE_REQUEST_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.UPDATE_PROFILE_REQUEST_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Get Car Info Saga **************
export function* getCarInfoRequest() {
  yield takeLatest(types.GET_CAR_INFO_REQUEST, getCarInfo);
}
function* getCarInfo(params) {
  try {
    const res = yield carInfo(params?.params);
    if (res) {
      yield put({
        type: types.GET_CAR_INFO_REQUEST_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.GET_CAR_INFO_REQUEST_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Update Car Info Saga **************
export function* updateCarInfoRequest() {
  yield takeLatest(types.UPADTE_CAR_INFO_REQUEST, updateCarInfo);
}
function* updateCarInfo(params) {
  try {
    let res = yield carInfoUpdate(params?.params);
    if (res) {
      res = {
        ...res,
        profile: {
          ...res?.profile,
          user_car_brands: [
            {
              id: res.profile?.car_brand_id,
              title: res.profile?.car_brand
            }
          ],
          user_car_models: [...res.profile?.car_models]
        }
      }
      console.log("res>>>>>>>>22", JSON.stringify(res, null, 2));
      yield put({
        type: types.UPADTE_CAR_INFO_REQUEST_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.UPADTE_CAR_INFO_REQUEST_FAILURE,
      payload: null,
    });
    // console.log("error222>>", error);
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Get Quick Chats Saga **************
export function* getQuickChatsRequest() {
  yield takeLatest(types.GET_QUICK_CHATS_REQUEST, getQuickChats);
}
function* getQuickChats(params) {
  try {
    const res = yield quickChats();
    if (res) {
      yield put({
        type: types.GET_QUICK_CHATS_REQUEST_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.GET_QUICK_CHATS_REQUEST_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Add Quick Chat Saga **************
export function* addQuickChatRequest() {
  yield takeLatest(types.ADD_QUICK_CHAT_REQUEST, addQuickChat);
}
function* addQuickChat(params) {
  try {
    const res = yield addChat(params?.params);
    if (res) {
      yield put({
        type: types.ADD_QUICK_CHAT_REQUEST_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.ADD_QUICK_CHAT_REQUEST_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Edit Quick Chat Saga **************
export function* editQuickChatRequest() {
  yield takeLatest(types.EDIT_QUICK_CHAT_REQUEST, editQuickChat);
}
function* editQuickChat(params) {
  try {
    const res = yield editChat(params?.params);
    if (res) {
      yield put({
        type: types.EDIT_QUICK_CHAT_REQUEST_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.EDIT_QUICK_CHAT_REQUEST_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* remove Quick Chat Saga **************
export function* removeQuickChatRequest() {
  yield takeLatest(types.REMOVE_QUICK_CHAT_REQUEST, removeQuickChat);
}
function* removeQuickChat(params) {
  try {
    const res = yield removeChat(params?.params);
    if (res) {
      yield put({
        type: types.REMOVE_QUICK_CHAT_REQUEST_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.REMOVE_QUICK_CHAT_REQUEST_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Get Static Pages Saga **************
export function* staticPagesRequest() {
  yield takeLatest(types.STATIC_PAGES_REQUEST, staticPages);
}
function* staticPages(params) {
  try {
    const res = yield staticPagesRes(params?.params);
    if (res) {
      yield put({
        type: types.STATIC_PAGES_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.STATIC_PAGES_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Get FAQa Saga **************
export function* getFaqsRequest() {
  yield takeLatest(types.GET_FAQS_REQUEST, getFaqs);
}
function* getFaqs(params) {
  try {
    const res = yield faqs();
    if (res) {
      yield put({
        type: types.GET_FAQS_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.GET_FAQS_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Get Support Tickets Saga **************
export function* getSupportTicketsRequest() {
  yield takeLatest(types.GET_SUPPORT_TICKETS_REQUEST, getSupportTickets);
}
function* getSupportTickets(params) {
  try {
    const res = yield getTickets();
    if (res) {
      yield put({
        type: types.GET_SUPPORT_TICKETS_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.GET_SUPPORT_TICKETS_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Create Support Tickets Saga **************
export function* createSupportTicketRequest() {
  yield takeLatest(types.CREATE_SUPPORT_TICKETS_REQUEST, createSupportTickets);
}
function* createSupportTickets(params) {
  try {
    const res = yield createTicket(params?.params);
    if (res) {
      yield put({
        type: types.CREATE_SUPPORT_TICKETS_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.CREATE_SUPPORT_TICKETS_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Get Support Messages Saga **************
export function* getSupportMessagesRequest() {
  yield takeLatest(types.GET_SUPPORT_MESSAGES_REQUEST, getSupportMessages);
}
function* getSupportMessages(params) {
  try {
    const res = yield getMessages(params?.params);
    if (res) {
      yield put({
        type: types.GET_SUPPORT_MESSAGES_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.GET_SUPPORT_MESSAGES_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Get Support Messages Saga **************
export function* sendSupportMessageRequest() {
  yield takeLatest(types.SEND_SUPPORT_MESSAGE_REQUEST, sendSupportMessage);
}
function* sendSupportMessage(params) {
  try {
    const res = yield sendMessage(params?.params);
    if (res) {
      yield put({
        type: types.SEND_SUPPORT_MESSAGE_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.SEND_SUPPORT_MESSAGE_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Get History Saga **************
export function* getHistoryRequest() {
  yield takeLatest(types.GET_HISTORY_REQUEST, getHistory);
}
function* getHistory(params) {
  try {
    const res = yield getAllHistory();
    if (res) {
      yield put({
        type: types.GET_HISTORY_REQUEST_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.GET_HISTORY_REQUEST_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Toggle Online Status Saga **************
export function* toggleOnlineStatusRequest() {
  yield takeLatest(types.TOGGLE_ONLINE_STATUS_REQ, toggleOnlineStatus);
}
function* toggleOnlineStatus(params) {
  try {
    const res = yield toggleStatus(params?.params);
    if (res) {
      yield put({
        type: types.TOGGLE_ONLINE_STATUS_REQ_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.TOGGLE_ONLINE_STATUS_REQ_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}
