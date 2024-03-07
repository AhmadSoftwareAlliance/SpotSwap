import * as TYPES from '../../actions/types/auth_types';

const initialState = {
  loading: false,
  isSuccess: false,
  isFailure: false,
  userInfo: null,
  forgotPassRes: null,
  resetPassRes: null,
  otp_verify: null,
  resendData: null,
  carSpecs: null,
};

const authReducer = (state = initialState, actions) => {
  const {type, payload} = actions;
  switch (type) {
    case TYPES.LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        userInfo: payload?.user,
      };
    case TYPES.LOGIN_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        userInfo: null,
      };
    case TYPES.SOCIAL_LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        userInfo: payload?.user,
      };
    case TYPES.SOCIAL_LOGIN_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        userInfo: null,
      };
    case TYPES.UPDATE_SOCIAL_PROFILE_REQ_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        userInfo: payload?.user,
      };
    case TYPES.UPDATE_SOCIAL_PROFILE_REQ_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        userInfo: null,
      };
    case TYPES.SIGNUP_SUCCESS_REQUEST:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        userInfo: payload?.user,
      };
    case TYPES.SIGNUP_FAILURE_REQUEST:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        userInfo: null,
      };
    case TYPES.GET_CAR_SPECS_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        carSpecs: payload,
      };
    case TYPES.GET_CAR_SPECS_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        carSpecs: null,
      };
    case TYPES.GET_CAR_SPECS_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.GET_CAR_SPECS_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: true,
        isSuccess: true,
        isFailure: false,
        forgotPassRes: payload,
      };
    case TYPES.FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        forgotPassRes: null,
      };
    case TYPES.OTP_VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        otp_verify: payload,
      };
    case TYPES.OTP_VERIFY_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        otp_verify: null,
      };
    case TYPES.RESEND_OTP_SUCCESS:
      return {
        ...state,
        loading: true,
        isSuccess: true,
        isFailure: false,
        resendData: payload,
      };
    case TYPES.RESEND_OTP_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        resendData: null,
      };
    case TYPES.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: true,
        isSuccess: true,
        isFailure: false,
        resetPassRes: payload,
      };
    case TYPES.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        resetPassRes: null,
      };
    case TYPES.LOGOUT_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        userInfo: null,
      };
    case TYPES.LOGOUT_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        userInfo: null,
      };
    case TYPES.DELETE_ACCOUNT_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
      };
    default:
      return state;
  }
};

export default authReducer;
