import {fork} from 'redux-saga/effects';

// Auth Requests
import {
  loginRequest,
  socialLoginRequest,
  updateSocialProfileReq,
  signUpRequest,
  getCarSpecsRequest,
  createCarProfileRequest,
  forgotPassRequest,
  OTPVerifyRequest,
  resendOTPRequestSaga,
  resetPassRequest,
  logoutRequestSaga,
  deleteAccountSaga,
} from './auth-saga/auth-saga';

// Home Requests
import {
  saveFCMTokenReq,
  createSpotReq,
  getAllSpotsReq,
  getAllFindersReq,
  activateSpotReq,
  createConnectionRequest,
  cancelConnectionRequest,
  createConversationRequest,
  getConversationsRequest,
  deleteConversationRequest,
  blockUnblockChatRequest,
  getMessagesRequest,
  sendMessageRequest,
  confirmCancelConnectionReq,
  transferParkingSpotReq,
  availParkingSpotReq,
  confirmArrivalReq,
  stillInterestedReq,
  saveSwapperLocReq,
} from './home-saga/home-saga';

// Profile Requests
import {
  getProfileRequest,
  updateProfileRequest,
  getCarInfoRequest,
  updateCarInfoRequest,
  getQuickChatsRequest,
  addQuickChatRequest,
  editQuickChatRequest,
  removeQuickChatRequest,
  staticPagesRequest,
  getFaqsRequest,
  getSupportTicketsRequest,
  createSupportTicketRequest,
  getSupportMessagesRequest,
  sendSupportMessageRequest,
  getHistoryRequest,
  toggleOnlineStatusRequest,
} from './profile-saga/profile-saga';

// Payment Requests
import {
  getAllCardsRequest,
  addCardRequest,
  updateCardRequest,
  deleteCardRequest,
  getWalletDetailsRequest,
  getLinkRequest,
  topUpRequest,
  withDrawRequest,
  defaultPayMethodReq,
  addPayPalAccountReq,
  savePayPalAccountReq,
  getApprovalURLReq,
  savePayPalResReq,
} from './payment-saga/payment-saga';

export function* rootSaga() {
  // Auth Requests
  yield fork(loginRequest);
  yield fork(socialLoginRequest);
  yield fork(updateSocialProfileReq);
  yield fork(signUpRequest);
  yield fork(getCarSpecsRequest);
  yield fork(createCarProfileRequest);
  yield fork(forgotPassRequest);
  yield fork(OTPVerifyRequest);
  yield fork(resendOTPRequestSaga);
  yield fork(resetPassRequest);
  yield fork(logoutRequestSaga);
  yield fork(deleteAccountSaga);
  // Home Requests
  yield fork(saveFCMTokenReq);
  yield fork(createSpotReq);
  yield fork(getAllSpotsReq);
  yield fork(getAllFindersReq);
  yield fork(activateSpotReq);
  yield fork(createConnectionRequest);
  yield fork(cancelConnectionRequest);
  yield fork(createConversationRequest);
  yield fork(getConversationsRequest);
  yield fork(deleteConversationRequest);
  yield fork(blockUnblockChatRequest);
  yield fork(getMessagesRequest);
  yield fork(sendMessageRequest);
  yield fork(confirmCancelConnectionReq);
  yield fork(transferParkingSpotReq);
  yield fork(availParkingSpotReq);
  yield fork(confirmArrivalReq);
  yield fork(stillInterestedReq);
  yield fork(saveSwapperLocReq);
  // Profile Requests
  yield fork(getProfileRequest);
  yield fork(updateProfileRequest);
  yield fork(getCarInfoRequest);
  yield fork(updateCarInfoRequest);
  yield fork(getQuickChatsRequest);
  yield fork(addQuickChatRequest);
  yield fork(editQuickChatRequest);
  yield fork(removeQuickChatRequest);
  yield fork(staticPagesRequest);
  yield fork(getFaqsRequest);
  yield fork(getSupportTicketsRequest);
  yield fork(createSupportTicketRequest);
  yield fork(getSupportMessagesRequest);
  yield fork(sendSupportMessageRequest);
  yield fork(getHistoryRequest);
  yield fork(toggleOnlineStatusRequest);
  // Payment Requests
  yield fork(getAllCardsRequest);
  yield fork(addCardRequest);
  yield fork(updateCardRequest);
  yield fork(deleteCardRequest);
  yield fork(getWalletDetailsRequest);
  yield fork(getLinkRequest);
  yield fork(topUpRequest);
  yield fork(withDrawRequest);
  yield fork(defaultPayMethodReq);
  yield fork(addPayPalAccountReq);
  yield fork(savePayPalAccountReq);
  yield fork(getApprovalURLReq);
  yield fork(savePayPalResReq);
}
