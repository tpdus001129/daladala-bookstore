import Joi from "joi";
import { error } from "./customErrorMessage.js";
import {
  PHONE_NUMBER_REGEX,
} from "../../utils/regex.js";

const order = {
  post: {
    body: Joi.object().keys({
      recipient: Joi.object().keys({
        phoneNumber: Joi.string()
          .required()
          .pattern(PHONE_NUMBER_REGEX)
          .messages(error.userErrorMessage.phoneNumber),
        name: Joi.string().required().messages(error.userErrorMessage.name),
        address: Joi.object().keys({
          zipCode: Joi.string()
            .required()
            .messages(error.userErrorMessage.zipCode),
          detail1: Joi.string()
            .required()
            .messages(error.userErrorMessage.detail1),
          detail2: Joi.string()
            .required()
            .messages(error.userErrorMessage.detail2),
        }),
      }),

      books: Joi.array().items(
        Joi.object().keys({
          bookId: Joi.string()
            .required()
            .messages(error.orderErrorMessage.bookId),
          count: Joi.number()
            .required()
            .messages(error.orderErrorMessage.count),
        }),
      ),

      deliveryPrice: Joi.number()
        .required()
        .messages(error.orderErrorMessage.deliveryPrice),

      productsPrice: Joi.number()
        .required()
        .messages(error.orderErrorMessage.productsPrice),
    }),
  },
};

export default order;
