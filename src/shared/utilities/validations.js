import * as yup from 'yup';

export const loginFormFields = {
  email: '',
  password: '',
};

export const registerFormFields = {
  name: '',
  email: '',
  number: '',
  password: '',
  referralCode: '',
  confirmPassword: '',
};

export const socialRegisterFormFields = {
  name: '',
  email: '',
  number: '',
  referralCode: '',
};

export const carInfoFormFields = {
  brand: '',
  model: '',
  year: '',
  color: '',
  length: '',
  width: '',
  height: '',
  plateNumber: '',
};

export const sendMailFormFields = {
  email: '',
};

export const resetPassFormFields = {
  password: '',
  confirmPassword: '',
};

export const personalInfoFormFields = {
  name: '',
  email: '',
  number: '',
};

export const updateCarInfoFormFields = {
  brand: '',
  model: '',
  year: '',
  color: '',
  width: '',
  length: '',
  height: '',
  plateNumber: '',
};

export const quickChatFormFields = {
  chat: '',
};

export const ticketFormField = {
  discription: '',
};

export const descFormField = {
  discription: '',
  // amount: '',
};

export const cardFormField = {
  name: '',
  address: '',
  country: '',
};

export const topUpField = {
  amount: '',
  referralCode: '',

};

export const payPalDetailFormField = {
  email: '',
};

export const LoginVS = yup.object().shape({
  email: yup
    .string()
    .required('Email Required')
    .email('Please provide a valid email address'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password Required'),
});

export const sendMailVS = yup.object().shape({
  email: yup
    .string()
    .required('Email Required')
    .email('Please provide a valid email address'),
});

export const resetPassVS = yup.object().shape({
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('New Password Required'),
  confirmPassword: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Confirm Password Required')
    .oneOf([yup.ref('password'), null], 'New Password does not match'),
});

export const registerVS = yup.object().shape({
  name: yup.string().required('Name Required').label('name'),
  email: yup
    .string()
    .required('Email Required')
    .email('Please provide a valid email address'),
  number: yup
    .number()
    .typeError('Invalid contact number')
    .required('Contact Number Required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('New Password Required'),
  confirmPassword: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Confirm Password Required')
    .oneOf([yup.ref('password'), null], 'New Password does not match'),
  referralCode: yup
    .string()
    .optional('Referral Code Required')
    .label('referralCode'),
});

export const socialRegisterVS = yup.object().shape({
  name: yup.string().required('Name Required').label('name'),
  email: yup
    .string()
    .required('Email Required')
    .email('Please provide a valid email address'),
  number: yup
    .number()
    .typeError('Invalid contact number')
    .required('Contact Number Required'),
  referralCode: yup
    .string()
    .optional('Referral Code Required')
    .label('referralCode'),
});

export const carInfoVS = yup.object().shape({
  brand: yup.object().shape().required('Brand Required'),
  model: yup.object().shape().required('Model Required'),
  year: yup.object().shape().nullable('Year Required'),
  length: yup.number().typeError('Invalid length').required('Length Required'),
  width: yup.number().typeError('Invalid width').required('Width Required'),
  height: yup.number().typeError('Invalid height').required('Height Required'),
  color: yup.string().required('Color Required').label('color'),
  plateNumber: yup
    .string()
    .optional('Plate Number Required')
    .label('plateNumber'),
});

export const updateCarInfoVS = yup.object().shape({
  brand: yup.object().shape().nullable('Brand Required'),
  model: yup.object().shape().nullable('Model Required'),
  year: yup.object().shape().nullable('Year Required'),
  length: yup.number().typeError('Invalid length').required('Length Required'),
  width: yup.number().typeError('Invalid width').required('Width Required'),
  height: yup.number().typeError('Invalid height').required('Height Required'),
  color: yup.string().required('Color Required').label('color'),
  plateNumber: yup
    .string()
    .optional('Plate Number Required')
    .label('plateNumber'),
});

export const personalInfoVS = yup.object().shape({
  name: yup.string().required('Name Required').label('name'),
  email: yup
    .string()
    .required('Email Required')
    .email('Please provide a valid email address'),
  number: yup
    .number()
    .typeError('Invalid contact number')
    .required('Contact Number Required'),
});

export const quickChatVS = yup.object().shape({
  chat: yup.string().required('Quick Chat Required').label('chat'),
});

export const ticketVs = yup.object().shape({
  discription: yup.string().required('Message Required'),
});

export const cardDetailsVs = yup.object().shape({
  name: yup.string().required('Card Name Required'),
  address: yup.string().required('Address Required'),
  country: yup.string().required('Country Required'),
});

export const payPalDetailVs = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Required'),
});

export const topUpVS = yup.object().shape({
  amount: yup
    .number()
    .typeError('Invalid amount')
    .required('Amount Required')
    .label('amount'),
  referralCode: yup
    .string()
    .optional('Referral Code Required')
    .label('referralCode'),
});

export const descVs = yup.object().shape({
  discription: yup.string().optional('Description Required'),
  // amount: yup
  //   .number()
  //   .typeError('Invalid amount')
  //   .required('Amount Required')
  //   .label('amount'),
});
