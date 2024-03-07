export {
  appSvgs,
  appIcons,
  appLogos,
  appVideos,
  appImages,
} from './theme/assets';

export {colors} from './theme/colors';
export {size} from './theme/sizes';
export {family} from './theme/family';
export {
  WP,
  HP,
  scrWidth,
  scrHeight,
  platformOrientedCode,
} from './theme/responsive';

export {
  LoginVS,
  loginFormFields,
  registerVS,
  registerFormFields,
  sendMailVS,
  sendMailFormFields,
  resetPassVS,
  resetPassFormFields,
  carInfoVS,
  carInfoFormFields,
  personalInfoVS,
  personalInfoFormFields,
  updateCarInfoVS,
  updateCarInfoFormFields,
  quickChatVS,
  quickChatFormFields,
  socialRegisterVS,
  socialRegisterFormFields,
  ticketVs,
  ticketFormField,
  cardDetailsVs,
  cardFormField,
  payPalDetailVs,
  payPalDetailFormField,
  descFormField,
  descVs,
  topUpField,
  topUpVS,
} from './utilities/validations';
export {
  StatusBarHeight,
  DimensionsWindowWidth,
  DimensionsWindowHeight,
} from './theme/statusBarHeight';

export {setupAxios, HTTP_CLIENT, initialConfig} from './utilities/config';
export {ENDPOINTS} from './utilities/endpoints';
export {
  networkText,
  cardMethods,
  image_options,
  mapCustomStyle,
} from './utilities/constant';
export {header, authHeader} from './utilities/headers';
export {
  checkBrand,
  checkConnected,
  responseValidator,
} from './utilities/helper';
export {
  requestPermission,
  LocalNotification,
  NotificationListener,
} from './service/NotificationHandler';
