import AsyncStorage from '@react-native-async-storage/async-storage';
import {takeLatest, put} from 'redux-saga/effects';
import {responseValidator} from '../../../shared/exporter';
import {
  loginUser,
  socialLogin,
  profileUpdate,
  registerUser,
  forgotPassword,
  OTPVerify,
  resendOTP,
  resetPassword,
  logoutUser,
  carSpecs,
  carProfile,
  deleteUser,
} from '../../../shared/service/AuthServices';
import * as types from '../../actions/types/auth_types';

// ************* Login Saga **************
export function* loginRequest() {
  yield takeLatest(types.LOGIN_REQUEST_REQUEST, login);
}
function* login(params) {
  try {
    const res = yield loginUser(params?.params);
    if (res) {
      yield put({
        type: types.LOGIN_REQUEST_SUCCESS,
        payload: res,
      });
      AsyncStorage.setItem('userToken', res?.user?.token);
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.LOGIN_REQUEST_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Social Login Saga **************
export function* socialLoginRequest() {
  yield takeLatest(types.SOCIAL_LOGIN_REQUEST, socialLoginUser);
}
function* socialLoginUser(params) {
  try {
    const res = yield socialLogin(params?.params);
    if (res) {
      yield put({
        type: types.SOCIAL_LOGIN_REQUEST_SUCCESS,
        payload: res,
      });
      AsyncStorage.setItem('userToken', res?.user?.token);
      params?.cbSuccess(res);
    } else {
      yield put({
        type: types.SOCIAL_LOGIN_REQUEST_FAILURE,
        payload: null,
      });
    }
  } catch (error) {
    yield put({
      type: types.SOCIAL_LOGIN_REQUEST_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status);
    params?.cbFailure(msg);
  }
}

// ************* Update Social Profile Saga **************
export function* updateSocialProfileReq() {
  yield takeLatest(types.UPDATE_SOCIAL_PROFILE_REQ, socialProfileUpdate);
}
function* socialProfileUpdate(params) {
  try {
    const res = yield profileUpdate(params?.params);
    if (res) {
      yield put({
        type: types.UPDATE_SOCIAL_PROFILE_REQ_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    } else {
      yield put({
        type: types.UPDATE_SOCIAL_PROFILE_REQ_FAILURE,
        payload: null,
      });
    }
  } catch (error) {
    yield put({
      type: types.UPDATE_SOCIAL_PROFILE_REQ_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Sign Up Saga **************
export function* signUpRequest() {
  yield takeLatest(types.SIGNUP_REQUEST_REQUEST, signUp);
}
function* signUp(params) {
  try {
    const res = yield registerUser(params?.params);
    if (res) {
      yield put({
        type: types.SIGNUP_SUCCESS_REQUEST,
        payload: res,
      });
      AsyncStorage.setItem('userToken', res?.user?.token);
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.SIGNUP_FAILURE_REQUEST,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Get Car Specs Saga **************
export function* getCarSpecsRequest() {
  yield takeLatest(types.GET_CAR_SPECS_REQUEST, getCarSpecs);
}
function* getCarSpecs(params) {
  try {
    const res = yield carSpecs();
    if (res) {
      yield put({
        type: types.GET_CAR_SPECS_REQUEST_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.GET_CAR_SPECS_REQUEST_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Create Car Profile Saga **************
export function* createCarProfileRequest() {
  yield takeLatest(types.CAR_PROFILE_REQUEST, createCarProfile);
}
function* createCarProfile(params) {
  try {
    const res = yield carProfile(params?.params);
    if (res) {
      yield put({
        type: types.CAR_PROFILE_REQUEST_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.CAR_PROFILE_REQUEST_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Forgot Saga **************
export function* forgotPassRequest() {
  yield takeLatest(types.FORGOT_PASSWORD_REQUEST, forgot);
}
function* forgot(params) {
  try {
    const res = yield forgotPassword(params?.params);
    console.log("forgotPassword",JSON.stringify(res,null,2));
    if (res) {
      yield put({
        type: types.FORGOT_PASSWORD_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    console.log("forgotPassword",JSON.stringify(error,null,2));
    yield put({
      type: types.FORGOT_PASSWORD_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Verify OTP Saga **************
export function* OTPVerifyRequest() {
  yield takeLatest(types.OTP_VERIFY_REQUEST, verifyOTP);
}
function* verifyOTP(params) {
  try {
    const res = yield OTPVerify(params?.params);
    if (res) {
      yield put({
        type: types.OTP_VERIFY_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.OTP_VERIFY_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Resend OTP Saga **************
export function* resendOTPRequestSaga() {
  yield takeLatest(types.RESEND_OTP_REQUEST, resend_otp);
}
function* resend_otp(params) {
  try {
    const res = yield resendOTP(params?.params);
    if (res) {
      yield put({
        type: types.RESEND_OTP_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.RESEND_OTP_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Reset Password Saga **************
export function* resetPassRequest() {
  yield takeLatest(types.RESET_PASSWORD_REQUEST, resetPass);
}
function* resetPass(params) {
  try {
    const res = yield resetPassword(params?.params);
    if (res) {
      yield put({
        type: types.RESET_PASSWORD_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.RESET_PASSWORD_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

//************* Logout Saga **************
export function* logoutRequestSaga() {
  yield takeLatest(types.LOGOUT_REQUEST_REQUEST, logout);
}
function* logout(params) {
  try {
    const res = yield logoutUser();
    yield put({
      type: types.LOGOUT_REQUEST_SUCCESS,
      payload: params,
    });
    params?.cbSuccess(res);
  } catch (error) {
    yield put({
      type: types.LOGOUT_REQUEST_SUCCESS,
      payload: params,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbSuccess(msg);
  }
}

//************* Delete Account Saga **************
export function* deleteAccountSaga() {
  yield takeLatest(types.DELETE_ACCOUNT_REQUEST, deleteAccount);
}
function* deleteAccount(params) {
  console.log("patrm on deleacoount",JSON.stringify(params,null,2));
  try {
    const res = yield deleteUser(params?.params);
    if (res) {
      yield put({
        type: types.DELETE_ACCOUNT_SUCCESS,
        payload: params,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.DELETE_ACCOUNT_FAILURE,
      payload: params,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    console.log("msg",msg);
    params?.cbFailure(msg);
  }
}
