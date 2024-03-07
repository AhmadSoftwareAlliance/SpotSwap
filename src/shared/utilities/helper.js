import NetInfo from '@react-native-community/netinfo';
import {appIcons} from '../exporter';
import {appLogos} from '../theme/assets';

export const checkConnected = () => {
  return NetInfo.fetch().then(state => {
    return state.isConnected;
  });
};

export const responseValidator = (response, errorMsg) => {
  let errorCode = response;
  if (errorCode === 401) {
    if (errorMsg) {
      const msg = errorMsg?.errors || errorMsg?.message || errorMsg?.error;
      return msg;
    } else {
      return 'Something went wrong!';
    }
  } else if (errorCode === 400) {
    if (errorMsg) {
      const msg = errorMsg?.errors || errorMsg?.message || errorMsg?.error;
      return msg;
    } else {
      return 'Something went wrong!';
    }
  } else if (errorCode === 404) {
    if (errorMsg) {
      const msg = errorMsg?.errors || errorMsg?.message || errorMsg?.error;
      return msg;
    } else {
      return 'Something went wrong!';
    }
  } else if (errorCode === 406) {
    if (errorMsg) {
      const msg = errorMsg?.errors || errorMsg?.message || errorMsg?.error;
      return msg;
    } else {
      return 'Something went wrong!';
    }
  } else if (errorCode === 422) {
    if (errorMsg) {
      const msg = errorMsg?.errors || errorMsg?.message || errorMsg?.error;
      return msg;
    } else {
      return 'Something went wrong!';
    }
  } else if (errorCode === 500) {
    if (errorMsg) {
      const msg = errorMsg?.errors || errorMsg?.message || errorMsg?.error;
      return msg;
    } else {
      return 'Internal Server Error Please Try Again!';
    }
  } else {
    return 'Something went wrong!';
  }
};

export const checkBrand = name => {
  if (name === 'Visa') {
    return appIcons.visaIcon;
  } else if (name === 'MasterCard') {
    return appLogos.masterCardLogo;
  }
};
