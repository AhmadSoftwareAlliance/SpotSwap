import {takeLatest, put} from 'redux-saga/effects';
import {responseValidator} from '../../../shared/exporter';
import {
  cards,
  topUp,
  getLink,
  editCard,
  payPalRes,
  createCard,
  removeCard,
  approvalURL,
  addPayPalAcc,
  savePayPalAcc,
  defaultMethod,
  walletDetails,
  withDraw,
} from '../../../shared/service/PaymentServices';
import * as types from '../../actions/types/payment_types';

// ************* Get All Cards Saga **************
export function* getAllCardsRequest() {
  yield takeLatest(types.GET_ALL_CARDS_REQUEST, getCards);
}
function* getCards(params) {
  try {
    const res = yield cards();
    if (res) {
      yield put({
        type: types.GET_ALL_CARDS_REQUEST_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.GET_ALL_CARDS_REQUEST_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Add Card Saga **************
export function* addCardRequest() {
  yield takeLatest(types.ADD_CARD_REQUEST, addCard);
}
function* addCard(params) {
  try {
    const res = yield createCard(params?.params);
    if (res) {
      yield put({
        type: types.ADD_CARD_REQUEST_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.ADD_CARD_REQUEST_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Update Card Saga **************
export function* updateCardRequest() {
  yield takeLatest(types.UPDATE_CARD_REQUEST, updateCard);
}
function* updateCard(params) {
  try {
    const res = yield editCard(params?.params);
    if (res) {
      yield put({
        type: types.UPDATE_CARD_REQUEST_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.UPDATE_CARD_REQUEST_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Delete Card Saga **************
export function* deleteCardRequest() {
  yield takeLatest(types.DELETE_CARD_REQUEST, deleteCard);
}
function* deleteCard(params) {
  try {
    const res = yield removeCard(params?.params);
    if (res) {
      yield put({
        type: types.DELETE_CARD_REQUEST_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.DELETE_CARD_REQUEST_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Get Wallet Details Saga **************
export function* getWalletDetailsRequest() {
  yield takeLatest(types.GET_WALLET_DETAILS_REQ, getWalletDetailsReq);
}
function* getWalletDetailsReq(params) {
  try {
    const res = yield walletDetails();
    if (res) {
      yield put({
        type: types.GET_WALLET_DETAILS_REQ_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.GET_WALLET_DETAILS_REQ_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Get Link Saga **************
export function* getLinkRequest() {
  yield takeLatest(types.GET_LINK_REQUEST, getLinkReq);
}
function* getLinkReq(params) {
  try {
    const res = yield getLink();
    if (res) {
      yield put({
        type: types.GET_LINK_REQUEST_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.GET_LINK_REQUEST_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Top Up Saga **************
export function* topUpRequest() {
  yield takeLatest(types.TOP_UP_REQUEST, topUpReq);
}
function* topUpReq(params) {
  try {
    const res = yield topUp(params?.params);
    if (res) {
      yield put({
        type: types.TOP_UP_REQUEST_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.TOP_UP_REQUEST_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}
// ************* With drwa Saga **************
export function* withDrawRequest() {
  yield takeLatest(types.WITH_DRAW_REQUEST, withDrawReq);
}
function* withDrawReq(params) {
  try {
    const res = yield withDraw(params?.params);
    if (res) {
      yield put({
        type: types.WITH_DRAW_REQUEST_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.WITH_DRAW_REQUEST_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Default Pay Method Saga **************
export function* defaultPayMethodReq() {
  yield takeLatest(types.DEFAULT_PAY_METHOD_REQ, defaultPayMethod);
}
function* defaultPayMethod(params) {
  try {
    const res = yield defaultMethod(params?.params);
    if (res) {
      yield put({
        type: types.DEFAULT_PAY_METHOD_REQ_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.DEFAULT_PAY_METHOD_REQ_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Add PayPal Account Saga **************
export function* addPayPalAccountReq() {
  yield takeLatest(types.ADD_PAYPAL_ACCOUNT_REQ, addPayPalAccount);
}
function* addPayPalAccount(params) {
  try {
    const res = yield addPayPalAcc(params?.params);
    if (res) {
      yield put({
        type: types.ADD_PAYPAL_ACCOUNT_REQ_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.ADD_PAYPAL_ACCOUNT_REQ_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Save PayPal Account Saga **************
export function* savePayPalAccountReq() {
  yield takeLatest(types.SAVE_PAYPAL_ACCOUNT_REQ, savePayPalAccount);
}
function* savePayPalAccount(params) {
  try {
    const res = yield savePayPalAcc(params?.params);
    if (res) {
      yield put({
        type: types.SAVE_PAYPAL_ACCOUNT_REQ_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.SAVE_PAYPAL_ACCOUNT_REQ_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Get Approval URL Saga **************
export function* getApprovalURLReq() {
  yield takeLatest(types.GET_APPROVAL_URL_REQ, getApprovalURL);
}
function* getApprovalURL(params) {
  try {
    const res = yield approvalURL();
    if (res) {
      yield put({
        type: types.GET_APPROVAL_URL_REQ_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.GET_APPROVAL_URL_REQ_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Save PAyPal Res Saga **************
export function* savePayPalResReq() {
  yield takeLatest(types.SAVE_PAYPAL_RES_REQ, savePayPalRes);
}
function* savePayPalRes(params) {
  try {
    const res = yield payPalRes(params?.params);
    if (res) {
      yield put({
        type: types.SAVE_PAYPAL_RES_REQ_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.SAVE_PAYPAL_RES_REQ_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}
