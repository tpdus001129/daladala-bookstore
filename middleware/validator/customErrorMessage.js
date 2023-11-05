import {
  USER_EMAIL_REQUIRED,
  USER_PASSWORD_REQUIRED,
  USER_PHONE_NUMBER_REQUIRED,
  USER_EMAIL_FORMAT,
  USER_PASSWORD_FORMAT,
  USER_PHONE_NUMBER_FORMAT,
} from "../../config/errorMessagesConstants.js";

const error = {
  userErrorMessage: {
    email: {
      "any.required": USER_EMAIL_REQUIRED,
      "string.base": USER_EMAIL_FORMAT,
      "string.email": USER_EMAIL_FORMAT,
      "string.pattern.base": USER_EMAIL_FORMAT,
    },
    password: {
      "any.required": USER_PASSWORD_REQUIRED,
      "string.base": USER_PASSWORD_FORMAT,
      "string.pattern.base": USER_PASSWORD_FORMAT,
    },
    phoneNumber: {
      "any.required": USER_PHONE_NUMBER_REQUIRED,
      "string.base": USER_PHONE_NUMBER_FORMAT,
      "string.pattern.base": USER_PHONE_NUMBER_FORMAT,
    },
  },
};

export { error };
