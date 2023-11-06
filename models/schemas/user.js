import { Schema } from "mongoose";
import {
  emailValidator,
  userNameValidator,
  phoneNumberValidator,
  zipCodeValidator,
  addressDetailValidator,
} from "../../utils/validator.js";
import {
  USER_EMAIL_REQUIRED,
  USER_PASSWORD_REQUIRED,
  USER_PHONE_NUMBER_REQUIRED,
  USER_EMAIL_FORMAT,
  USER_PHONE_NUMBER_FORMAT,
  USER_ADDRESS_ZIP_CODE_FORMAT,
  USER_ADDRESS_DETAIL_FORMAT,
  USER_NAME_FORMAT,
} from "../../config/errorMessagesConstants.js";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, USER_EMAIL_REQUIRED],
      validate: {
        validator: emailValidator,
        message: USER_EMAIL_FORMAT,
      },
    },
    password: {
      type: String,
      required: [true, USER_PASSWORD_REQUIRED],
    },
    authority: {
      type: String,
      enum: ["일반", "판매자", "관리자"],
      default: "일반",
      required: true,
    },
    phoneNumber: {
      type: String,
      required: [true, USER_PHONE_NUMBER_REQUIRED],
      validate: {
        validator: phoneNumberValidator,
        message: USER_PHONE_NUMBER_FORMAT,
      },
    },
    address: {
      zipCode: {
        type: String,
        validate: {
          validator: zipCodeValidator,
          message: USER_ADDRESS_ZIP_CODE_FORMAT,
        },
      },
      detail: {
        type: String,
        validate: {
          validator: addressDetailValidator,
          message: USER_ADDRESS_DETAIL_FORMAT,
        },
      },
    },
    name: {
      type: String,
      validate: {
        validator: userNameValidator,
        message: USER_NAME_FORMAT,
      },
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  },
);

export default UserSchema;
