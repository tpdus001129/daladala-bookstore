import { Types } from "mongoose";
import { Order } from "../models/index.js";
import { CustomError } from "../utils/errors.js";
import { ORDER_ERROR } from "../config/errorMessagesConstants.js";
import { NotFoundError } from "../utils/errors.js";
import {
  USER_NOT_FOUND,
  BOOK_NOT_FOUND,
} from "../config/errorMessagesConstants.js";

const orderService = {
  async list(userId) {
    if (!Types.ObjectId.isValid(userId)) {
      throw new NotFoundError(USER_NOT_FOUND);
    }

    const orders = await Order.find({ user: userId })
      .populate({
        path: "user",
        select: "_id name email authority phoneNumber address",
      })
      .populate({
        path: "books.book",
        populate: [
          {
            path: "seller",
            select: "_id name email authority",
          },
          {
            path: "category",
            populate: [
              {
                path: "parent",
                select: "_id name parent",
              },
            ],
          },
        ],
      })
      .exec();
    return orders;
  },

  async create(userId, orderData) {
    if (!Types.ObjectId.isValid(userId)) {
      throw new NotFoundError(USER_NOT_FOUND);
    }

    orderData.books.forEach(book => {
      if (!Types.ObjectId.isValid(book.bookId)) {
        throw new NotFoundError(BOOK_NOT_FOUND);
      }
    })

    const order = await Order.create(orderData);
    if (!order) {
      throw new CustomError(ORDER_ERROR);
    }

    return order;
  },

  async update(userId, orderId, orderData) {
    console.log("Order Update", userId, orderId, orderData);
    return true;
  },
};

export default orderService;
