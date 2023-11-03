import { ObjectId } from "mongodb";
import { Schema } from "mongoose";

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
        required: true,
      },
      zipCode: {
        type: String,
        required: true,
      },
      detail: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    books: {
      type: [
        {
          bookId: {
            type: ObjectId,
            ref: "Book",
            required: true,
          },
          count: {
            type: Number,
            required: true,
          },
        },
      ],
      required: true,
    },
    deliveryPrice: {
      type: Number,
      required: true,
    },
    productsPrice: {
      type: Number,
      required: true,
    },
    deliveryState: {
      type: String,
      enum: ["주문취소", "주문완료", "배송준비중", "배송중", "배송완료"],
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  },
);

export default OrderSchema;
