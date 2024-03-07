import {combineReducers} from 'redux';
import authReducer from './auth-reducer/auth-reducer';
import homeReducer from './home-reducer/home-reducer';
import profileReducer from './profile-reducer/profile-reducer';
import paymentReducer from './payment-reducer/payment-reducer';

import * as types from '../actions/types/auth_types';

const root_reducer = combineReducers({
  /* your app’s top-level reducers */
  auth: authReducer,
  home: homeReducer,
  profile: profileReducer,
  payment: paymentReducer,
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === types.LOGOUT_REQUEST_SUCCESS) {
    state = undefined;
  }

  return root_reducer(state, action);
};

export default rootReducer;
