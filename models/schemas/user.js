import { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    authority: {
      type: String,
      enum: ["일반", "판매자", "관리자"],
      default: "일반",
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      zipCode: String,
      detail: String,
    },
    name: String,
    deletedAt: Date,
  },
  {
    timestamps: true,
  },
);

export default UserSchema;
