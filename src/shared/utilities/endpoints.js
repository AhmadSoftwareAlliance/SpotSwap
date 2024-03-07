export const ENDPOINTS = {
  // Auth endpoints
  LOGIN: 'authentication/login',
  SOCIAL_LOGIN: 'social_logins/social_login',
  SOCIAL_USER: 'users/update_user',
  REGISTER: 'authentication/sign_up',
  CAR_SPECS: 'authentication/get_car_specification',
  CAR_PROFILE: 'authentication/create_car_profile',
  FORGOT_PASS: 'reset_passwords/send_otp',
  VERIFY_OTP: 'reset_passwords/verify_otp',
  RESEND_OTP: 'reset_passwords/resend_otp',
  RESET_PASS: 'reset_passwords/reset_password',
  LOGOUT: 'authentication/logout',
  DELETE_ACCOUNT: 'users/delete_user',
  // Home endpoints
  SAVE_FCM_TOKEN: 'authentication/notification_fcm_token',
  GET_ALL_SPOTS: 'parking_slots/get_all_spots',
  GET_ALL_FINDERS: 'parking_slots/get_all_finders',
  ACTIVATE_SPOT: 'parking_slots/make_slot_available',
  CREATE_SPOT: 'parking_slots/create_slot',
  CREATE_CONNECTION: 'swapper_host_connections/create_connection',
  CANCEL_CONNECTION: 'swapper_host_connections/notify_host_on_cancel_request',
  CREATE_CONVERSATION: 'messages/create_conversation',
  GET_CONVERSATIONS: 'messages/get_all_conversations',
  DELETE_CONVERSATION: 'messages/delete_conversation',
  BLOCK_UNBLOKC_CHAT: 'messages/block_or_unblock_user',
  GET_MESSAGES: 'messages/get_all_messages',
  SEND_MESSAGE: 'messages/create_message',
  CONFIRM_CANCEL: 'swapper_host_connections/destroy_connection',
  TRANSFER_SPOT: 'parking_slots/notify_swapper_on_slot_transfer',
  AVAIL_SPOT: 'wallets/charge_amount',
  CONFIRM_ARRIVAL:
    'swapper_host_connections/notify_swapper_for_confirm_arrival',
  STILL_INSTERESTED:
    'swapper_host_connections/notify_host_swapper_is_still_interested',
  SWAPPER_LOC: 'users/swapper_location_tracking',
  // Profile endpoints
  GET_PROFILE: 'users/get_user',
  UPDATE_PROFILE: 'users/update_user',
  // GET_CAR_IFNO: 'authentication/get_car_profile',
  GET_CAR_IFNO: 'authentication/get_user_car_profile',
  UPDATE_CAR_INFO: 'authentication/update_car_profile',
  QUICK_CHATS: 'quick_chats/get_all_quick_chat',
  ADD_CHAT: 'quick_chats/create_quick_chat',
  EDIT_CHAT: 'quick_chats/update_quick_chat',
  REMOVE_CHAT: chatId => `quick_chats/${chatId}/delete_quick_chat`,
  GET_FAQS: 'faqs',
  GET_TICKETS: 'supports/get_tickets',
  CREATE_TICKET: 'supports/create_ticket',
  SUPPORT_CHAT: 'supports/get_all_support_messages',
  SEND_SUPPORT_MESSAGE: 'supports/create_message',
  GET_HISTORY: 'histories/get_user_other_payment_histories',
  TOGGLE_STATUS: 'users/update_user_status',
  // Payment endpoints
  GET_CARDS: 'cards/get_all_cards',
  ADD_CARD: 'cards/create_card',
  UPDATE_CARD: 'cards/update_card',
  REMOVE_CARD: 'cards/destroy_card',
  WALLET_DETAILS: 'wallets/get_wallet_detail',
  GET_LINK: 'stripe_connects/user_stripe_connect_account',
  TOP_UP: 'wallets/add_amount_to_wallet',
  DEFAULT_PAY_METHOD: 'cards/make_payment_default',
  ADD_PAYPAL_ACCOUNT: 'pay_pal/create_paypal_customer_account',
  SAVE_PAYPAL_ACCOUNT: 'pay_pal/save_paypal_account_details',
  GET_APPROVAL_URL: 'pay_pal/create_payment',
  SAVE_PAYPAL_RES: 'pay_pal/transfer_amount',
};
