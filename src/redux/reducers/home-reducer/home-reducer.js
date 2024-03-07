import * as TYPES from '../../actions/types/home_types';

const initialState = {
  loading: false,
  isSuccess: false,
  isFailure: false,
  allMessages: null,
  allConversations: null,
  allSpots: null,
  allFinders: null,
};

const homeReducer = (state = initialState, actions) => {
  const {type, payload} = actions;
  switch (type) {
    case TYPES.CREATE_SPOT_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.CREATE_SPOT_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.GET_ALL_SPOTS_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        allSpots: payload,
      };
    case TYPES.GET_ALL_SPOTS_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        allSpots: null,
      };
    case TYPES.GET_ALL_FINDERS_REQ_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        allFinders: payload,
      };
    case TYPES.GET_ALL_FINDERS_REQ_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        allFinders: null,
      };
    case TYPES.ACTIVATE_SPOT_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.ACTIVATE_SPOT_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.CREATE_CONNECTION_REQ_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.CREATE_CONNECTION_REQ_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.CANCEL_CONNECTION_REQ_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.CANCEL_CONNECTION_REQ_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.CREATE_CONVERSATION_REQ_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.CREATE_CONVERSATION_REQ_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.GET_CONVERSATIONS_REQ_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        allConversations: payload,
      };
    case TYPES.GET_CONVERSATIONS_REQ_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        allConversations: null,
      };
    case TYPES.DELETE_CONVERSATION_REQ_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.DELETE_CONVERSATION_REQ_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.BLOCK_UNBLOCK_CHAT_REQ_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.BLOCK_UNBLOCK_CHAT_REQ_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.DELETE_CONVERSATION_REQ_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        allMessages: null,
      };
    case TYPES.DELETE_CONVERSATION_REQ_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        allMessages: null,
      };
    case TYPES.SEND_MESSAGE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.SEND_MESSAGE_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.CONFIRM_CANCEL_CONNECTION_REQ_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.CONFIRM_CANCEL_CONNECTION_REQ_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.TRANSFER_PARKING_SPOT_REQ_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.TRANSFER_PARKING_SPOT_REQ_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.AVAIL_PARKING_SPOT_REQ_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.AVAIL_PARKING_SPOT_REQ_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.CONFIRM_ARRIVAL_REQ_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.CONFIRM_ARRIVAL_REQ_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.STILL_INSTERESTED_REQ_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.STILL_INSTERESTED_REQ_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.SAVE_SWAPPER_LOC_REQ_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.SAVE_SWAPPER_LOC_REQ_FAILURE:
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

export default homeReducer;
