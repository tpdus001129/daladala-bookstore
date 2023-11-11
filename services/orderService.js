import { Types } from "mongoose";
import { Order } from "../models/index.js";
import { AUTHORITY_ADMIN } from "../config/constants.js";
import { CustomError, DeliveryError, AuthError } from "../utils/errors.js";
import { ORDER_ERROR } from "../config/errorMessagesConstants.js";
import { NotFoundError } from "../utils/errors.js";
import {
  ORDER_CANCELED,
  ORDER_IN_TRANSIT,
  ORDER_DELIVERED,
} from "../config/constants.js";
import {
  USER_NOT_FOUND,
  BOOK_NOT_FOUND,
  ORDER_NOT_FOUND,
  ORDER_DELIVERY_STATE_ERROR,
  DELIVERY_IN_PROGRESS_CANCELLATION_ERROR,
  UNAUTHORIZED_ERROR,
} from "../config/errorMessagesConstants.js";

const orderService = {
  async list() {
    const orders = await Order.find({
      deletedAt: { $exists: false },
    })
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

  async listByUser(userId) {
    if (!Types.ObjectId.isValid(userId)) {
      throw new NotFoundError(USER_NOT_FOUND);
    }

    const orders = await Order.find({
      user: userId,
      deletedAt: { $exists: false },
    })
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

  async detail(user, orderId) {
    
    if (!Types.ObjectId.isValid(user._id)) {
      throw new NotFoundError(USER_NOT_FOUND);
    }

    if (!Types.ObjectId.isValid(orderId)) {
      throw new NotFoundError(ORDER_NOT_FOUND);
    }

    const order = await Order.findOne({
      _id: orderId,
      deletedAt: { $exists: false },
    })
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

    if (order) {
      if (order.user._id.toString() !== user._id.toString() && user.authority !== AUTHORITY_ADMIN) {
        throw new AuthError(UNAUTHORIZED_ERROR);
      }
    }

    return order;
  },

  async create(userId, orderData) {
    if (!Types.ObjectId.isValid(userId)) {
      throw new NotFoundError(USER_NOT_FOUND);
    }

    orderData.books.forEach((book) => {
      if (!Types.ObjectId.isValid(book.book)) {
        throw new NotFoundError(BOOK_NOT_FOUND);
      }
    });

    const order = await Order.create(orderData);
    if (!order) {
      throw new CustomError(ORDER_ERROR);
    }

    return order;
  },

  async update(userId, orderId, orderData) {
    if (!Types.ObjectId.isValid(userId)) {
      throw new NotFoundError(USER_NOT_FOUND);
    }

    if (!Types.ObjectId.isValid(orderId)) {
      throw new NotFoundError(ORDER_NOT_FOUND);
    }

    let order = await Order.findById({ _id: orderId }).exec();
    if (orderData.deliveryState === ORDER_CANCELED) {
      if ([ORDER_IN_TRANSIT, ORDER_DELIVERED].includes(order.deliveryState)) {
        throw new DeliveryError(DELIVERY_IN_PROGRESS_CANCELLATION_ERROR);
      }
    }

    order = await Order.findOneAndUpdate(
      {
        _id: orderId,
        user: userId,
      },
      {
        deliveryState: orderData.deliveryState ? orderData.deliveryState : order.deliveryState,
        recipient: orderData.recipient ? orderData.recipient : order.recipient
      },
    );

    if (!order) {
      throw new CustomError(ORDER_DELIVERY_STATE_ERROR);
    }

    return order;
  },

  async remove(userId, orderId) {
    if (!Types.ObjectId.isValid(userId)) {
      throw new NotFoundError(USER_NOT_FOUND);
    }

    if (!Types.ObjectId.isValid(orderId)) {
      throw new NotFoundError(ORDER_NOT_FOUND);
    }

    const order = await Order.findOneAndUpdate(
      {
        _id: orderId
      },
      {
        deletedAt: new Date(),
      },
    );

    if (!order) {
      throw new CustomError(ORDER_DELIVERY_STATE_ERROR);
    }

    return order;
  },
};

export default orderService;
