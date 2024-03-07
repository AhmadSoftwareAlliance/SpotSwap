import * as TYPES from '../../actions/types/profile_types';

const initialState = {
  loading: false,
  isSuccess: false,
  isFailure: false,
  userProfile: null,
  carInfo: null,
  quickChats: null,
  staticPage: null,
  faqs: null,
  supportTickets: null,
  supportChat: null,
  history: null,
  onlineStatus: null,
};

const profileReducer = (state = initialState, actions) => {
  const {type, payload} = actions;
  switch (type) {
    case TYPES.GET_PROFILE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        userProfile: payload?.user,
      };
    case TYPES.GET_PROFILE_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        userProfile: null,
      };
    case TYPES.UPDATE_PROFILE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        userProfile: payload?.user,
      };
    case TYPES.UPDATE_PROFILE_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        userProfile: null,
      };
    case TYPES.GET_CAR_INFO_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        carInfo: payload,
      };
    case TYPES.GET_CAR_INFO_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        carInfo: null,
      };
    case TYPES.UPADTE_CAR_INFO_REQUEST_SUCCESS:
      console.log("payload?.payload",JSON.stringify(payload,null,2));
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        carInfo: payload?.profile,
      };
    case TYPES.UPADTE_CAR_INFO_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        carInfo: null,
      };
    case TYPES.GET_QUICK_CHATS_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        quickChats: payload,
      };
    case TYPES.GET_QUICK_CHATS_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        quickChats: null,
      };
    case TYPES.ADD_QUICK_CHAT_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.ADD_QUICK_CHAT_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.EDIT_QUICK_CHAT_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.EDIT_QUICK_CHAT_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.REMOVE_QUICK_CHAT_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.REMOVE_QUICK_CHAT_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.STATIC_PAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        staticPage: payload,
      };
    case TYPES.STATIC_PAGES_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        staticPage: null,
      };
    case TYPES.GET_FAQS_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        staticPage: payload,
      };
    case TYPES.GET_FAQS_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        staticPage: null,
      };
    case TYPES.GET_SUPPORT_TICKETS_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        supportTickets: payload,
      };
    case TYPES.GET_SUPPORT_TICKETS_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        supportTickets: null,
      };
    case TYPES.CREATE_SUPPORT_TICKETS_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.CREATE_SUPPORT_TICKETS_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.GET_SUPPORT_MESSAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        supportChat: payload,
      };
    case TYPES.GET_SUPPORT_MESSAGES_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        supportChat: null,
      };
    case TYPES.SEND_SUPPORT_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.SEND_SUPPORT_MESSAGE_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.GET_HISTORY_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        history: payload,
      };
    case TYPES.GET_HISTORY_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        history: null,
      };
    case TYPES.TOGGLE_ONLINE_STATUS_REQ_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        onlineStatus: payload,
      };
    case TYPES.TOGGLE_ONLINE_STATUS_REQ_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        onlineStatus: null,
      };
    default:
      return state;
  }
};

export default profileReducer;
