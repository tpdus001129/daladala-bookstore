import Joi from "joi";
import { error } from "./customErrorMessage.js";
import {
  PHONE_NUMBER_REGEX,
} from "../../utils/regex.js";
import {
  ORDER_CANCELED,
  ORDER_COMPLETED,
  ORDER_PREPARING_FOR_DELIVERY,
  ORDER_IN_TRANSIT,
  ORDER_DELIVERED,
} from "../../config/constants.js";

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
          book: Joi.string()
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

  deliveryStateUpdate: {
    body: Joi.object().keys({
      deliveryState: Joi.string()
        .valid(
          ...[
            ORDER_CANCELED,
            ORDER_COMPLETED,
            ORDER_PREPARING_FOR_DELIVERY,
            ORDER_IN_TRANSIT,
            ORDER_DELIVERED,
          ],
        )
        .messages(error.orderErrorMessage.deliveryState),
      recipient: Joi.object().keys({
        phoneNumber: Joi.string()
          .pattern(PHONE_NUMBER_REGEX)
          .messages(error.userErrorMessage.phoneNumber),
        name: Joi.string().messages(error.userErrorMessage.name),
        address: Joi.object().keys({
          zipCode: Joi.string()
            .messages(error.userErrorMessage.zipCode),
          detail1: Joi.string()
            .messages(error.userErrorMessage.detail1),
          detail2: Joi.string()
            .messages(error.userErrorMessage.detail2),
        }),
      }),
    }),
  },
};

export default order;
