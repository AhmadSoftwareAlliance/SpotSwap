import * as TYPES from '../types/payment_types';

//Get All Cards
export const getAllCardsRequest = (cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_ALL_CARDS_REQUEST,
    cbSuccess,
    cbFailure,
  };
};

//Add Card
export const addCardRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.ADD_CARD_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Update Card
export const updateCardRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.UPDATE_CARD_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Delete Card
export const deleteCardRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.DELETE_CARD_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

// Wallet Details
export const getWalletDetailsRequest = (cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_WALLET_DETAILS_REQ,
    cbSuccess,
    cbFailure,
  };
};

// Get Link
export const getLinkRequest = (cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_LINK_REQUEST,
    cbSuccess,
    cbFailure,
  };
};

// Top Up
export const topUpRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.TOP_UP_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};
// with draw
export const withDrawRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.WITH_DRAW_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Default Pay Method
export const defaultPayMethodReq = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.DEFAULT_PAY_METHOD_REQ,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Add PayPal Account
export const addPayPalAccountReq = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.ADD_PAYPAL_ACCOUNT_REQ,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Save PayPal Account
export const savePayPalAccountReq = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.SAVE_PAYPAL_ACCOUNT_REQ,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Get Approval URL
export const getApprovalURLReq = (cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_APPROVAL_URL_REQ,
    cbSuccess,
    cbFailure,
  };
};

//Save PayPal Res
export const savePayPalResReq = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.SAVE_PAYPAL_RES_REQ,
    params,
    cbSuccess,
    cbFailure,
  };
};
