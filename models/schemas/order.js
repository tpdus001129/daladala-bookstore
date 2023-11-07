import { ObjectId } from "mongodb";
import { Schema } from "mongoose";
import {
  userNameValidator,
  phoneNumberValidator,
  zipCodeValidator,
  addressDetailValidator,
} from "../../utils/validator.js";
import {
  USER_PHONE_NUMBER_REQUIRED,
  USER_ADDRESS_ZIP_CODE_REQUIRED,
  USER_ADDRESS_DETAIL_REQUIRED,
  USER_NAME_REQUIRED,
  BOOK_ID_REQUIRED,
  ORDER_COUNT_REQUIRED,
  ORDER_DELIVERY_PRICE_REQUIRED,
  USER_PHONE_NUMBER_FORMAT,
  USER_ADDRESS_ZIP_CODE_FORMAT,
  USER_ADDRESS_DETAIL_FORMAT,
  USER_NAME_FORMAT,
} from "../../config/errorMessagesConstants.js";

const OrderSchema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    recipient: {
      phoneNumber: {
        type: String,
        required: [true, USER_PHONE_NUMBER_REQUIRED],
        validate: {
          validator: phoneNumberValidator,
          message: USER_PHONE_NUMBER_FORMAT,
        },
      },
      name: {
        type: String,
        required: [true, USER_NAME_REQUIRED],
        validate: {
          validator: userNameValidator,
          message: USER_NAME_FORMAT,
        },
      },
      address: {
        zipCode: {
          type: String,
          required: [true, USER_ADDRESS_ZIP_CODE_REQUIRED],
          validate: {
            validator: zipCodeValidator,
            message: USER_ADDRESS_ZIP_CODE_FORMAT,
          },
        },
        detail1: {
          type: String,
          required: [true, USER_ADDRESS_DETAIL_REQUIRED],
          validate: {
            validator: addressDetailValidator,
            message: USER_ADDRESS_DETAIL_FORMAT,
          },
        },
        detail2: {
          type: String,
        },
      }
    },
    books: {
      type: [
        {
          bookId: {
            type: ObjectId,
            ref: "Book",
            required: [true, BOOK_ID_REQUIRED],
          },
          count: {
            type: Number,
            required: [true, ORDER_COUNT_REQUIRED],
          },
        },
      ],
      required: true,
    },
    deliveryPrice: {
      type: Number,
      required: [true, ORDER_DELIVERY_PRICE_REQUIRED],
    },
    productsPrice: {
      type: Number,
      required: true,
    },
    deliveryState: {
      type: String,
      enum: ["주문취소", "주문완료", "배송준비중", "배송중", "배송완료"],
      default: "주문완료",
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  },
);

export default OrderSchema;
