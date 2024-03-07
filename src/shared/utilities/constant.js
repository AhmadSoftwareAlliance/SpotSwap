import {appIcons} from '../theme/assets';
import {colors} from '../theme/colors';

const image_options = {
  width: 300,
  height: 400,
  multiple: true,
  mediaType: 'photo',
};

const networkText = 'Check Internet Connection';

const drawerList = [
  {
    id: 1,
    label: 'Home',
    screen: 'Home',
    icon: appIcons.homeIcon,
  },
  {
    id: 2,
    label: 'History',
    screen: 'History',
    icon: appIcons.historyIcon,
  },
  {
    id: 3,
    label: 'Inbox',
    screen: 'Chat',
    icon: appIcons.chatIcon,
  },
  {
    id: 4,
    label: 'Wallet',
    screen: 'Wallet',
    icon: appIcons.walletIcon,
  },
];

const commonSettings = [
  {
    id: 1,
    icon: appIcons.personIcon,
    screen: 'PersonalInfo',
    title: 'Personal Information',
    iconStyle: {width: 17, height: 20},
  },
  {
    id: 2,
    screen: 'UpdateCarInfo',
    icon: appIcons.carIcon,
    title: 'Car Information',
    iconStyle: {width: 29, height: 12},
  },
  {
    id: 3,
    screen: 'Payment',
    icon: appIcons.cardIcon,
    title: 'Payment Methods',
    iconStyle: {width: 29, height: 22},
  },
  {
    id: 4,
    screen: 'QuickChats',
    icon: appIcons.speechIcon,
    title: 'Quick Chats',
    iconStyle: {width: 28, height: 28},
  },
];

const guideLines = [
  {
    id: 1,
    screen: 'Support',
    title: 'Support',
    icon: appIcons.supportIcon,
    iconStyle: {width: 21, height: 20},
  },
  {
    id: 2,
    screen: 'FAQs',
    icon: appIcons.helpIcon,
    title: 'Frequently Asked Questions',
    iconStyle: {width: 22, height: 22},
  },
  {
    id: 3,
    screen: 'TermsConditions',
    icon: appIcons.helpIcon,
    title: 'Terms & Conditions',
    iconStyle: {width: 22, height: 22},
  },
  {
    id: 4,
    screen: 'PrivacyPolicy',
    icon: appIcons.privacyIcon,
    title: 'Privacy Policy',
    iconStyle: {width: 20, height: 23},
  },
  {
    id: 5,
    screen: 'BlockList',
    icon: appIcons.blockIcon,
    title: 'Block List',
    iconStyle: {width: 20, height: 20},
  },
  {
    id: 6,
    screen: 'DeleteAccount',
    icon: appIcons.delIcon,
    title: 'Delete Account',
    iconStyle: {width: 19, height: 18},
  },
  {
    id: 7,
    screen: 'LogOut',
    icon: appIcons.logoutIcon,
    title: 'Log out',
    iconStyle: {width: 20, height: 18},
  },
];

const cardMethods = [
  {
    id: 1,
    title: 'Credit Card',
    route: 'AddCardDetail',
  },
  {
    id: 2,
    title: 'Paypal',
    route: 'AddPaypalDetails',
  },
  {
    id: 3,
    title: 'Wallet',
    route: '',
  },
];

const mapCustomStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: colors.g6,
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: colors.white,
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: colors.g6,
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: colors.g15,
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: colors.g15,
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: colors.g6,
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: colors.g15,
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: colors.g16,
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: colors.g16,
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: colors.g16,
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: colors.g16,
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: colors.g16,
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: colors.g16,
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [
      {
        color: colors.b1,
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: colors.white,
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: colors.b2,
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: colors.white,
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: colors.white,
      },
    ],
  },
];

export {
  drawerList,
  guideLines,
  networkText,
  cardMethods,
  image_options,
  commonSettings,
  mapCustomStyle,
};
