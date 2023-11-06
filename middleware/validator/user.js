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

  put: {
    body: Joi.object().keys({
      password: Joi.string()
        .required()
        .pattern(PASSWORD_REGEX)
        .messages(error.userErrorMessage.password),
      phoneNumber: Joi.string()
        .required()
        .pattern(PHONE_NUMBER_REGEX)
        .messages(error.userErrorMessage.phoneNumber),
      name: Joi.string().messages(error.userErrorMessage.name),
      address: Joi.object().keys({
        zipCode: Joi.string(),
        detail1: Joi.string(),
        detail2: Joi.string(),
      })
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
