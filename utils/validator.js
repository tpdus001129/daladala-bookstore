import { EMAIL_REGEX, PASSWORD_REGEX, PHONE_NUMBER_REGEX } from "./regex.js";

const emailValidator = (value) => {
  return EMAIL_REGEX.test(value);
};

const passwordValidator = (value) => {
  return PASSWORD_REGEX.test(value);
};

const userNameValidator = (value) => {
  return value.length <= 10;
};

const phoneNumberValidator = (value) => {
  return PHONE_NUMBER_REGEX.test(value);
};

const zipCodeValidator = (value) => {
  return value.length <= 5;
};

const addressDetailValidator = (value) => {
  return value.length <= 100;
};

export {
  emailValidator,
  passwordValidator,
  userNameValidator,
  phoneNumberValidator,
  zipCodeValidator,
  addressDetailValidator,
};
