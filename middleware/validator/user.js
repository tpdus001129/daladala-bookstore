import Joi from "joi";
import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  PHONE_NUMBER_REGEX,
} from "../../utils/regex.js";
import { error } from "./customErrorMessage.js";

const user = {
  signup: {
    body: Joi.object().keys({
      email: Joi.string()
        .email()
        .required()
        .pattern(EMAIL_REGEX)
        .messages(error.userErrorMessage.email),
      password: Joi.string()
        .required()
        .pattern(PASSWORD_REGEX)
        .messages(error.userErrorMessage.password),
      phoneNumber: Joi.string()
        .required()
        .pattern(PHONE_NUMBER_REGEX)
        .messages(error.userErrorMessage.phoneNumber),
    }),
  },

  login: {
    body: Joi.object().keys({
      email: Joi.string()
        .email()
        .required()
        .messages(error.userErrorMessage.email),
      password: Joi.string()
        .required()
        .pattern(PASSWORD_REGEX)
        .messages(error.userErrorMessage.password),
    }),
  },

  remove: {
    body: Joi.object().keys({
      password: Joi.string()
        .required()
        .pattern(PASSWORD_REGEX)
        .messages(error.userErrorMessage.password),
    }),
  },

  passwordUpdate: {
    body: Joi.object().keys({
      password: Joi.string()
        .required()
        .pattern(PASSWORD_REGEX)
        .messages(error.userErrorMessage.password),
      newPassword: Joi.string()
        .required()
        .pattern(PASSWORD_REGEX)
        .messages(error.userErrorMessage.password),
    }),
  },
};

export default user;
