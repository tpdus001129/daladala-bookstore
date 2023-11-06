import { Types } from "mongoose";
import { User } from "../models/index.js";
import { comparePassword } from "../utils/utils.js";
import { NotFoundError } from "../utils/errors.js";
import {
  USER_NOT_FOUND,
  USER_PASSWORD_MISMATCH,
} from "../config/errorMessagesConstants.js";
import { AuthError } from "../utils/errors.js";

const userService = {
  async detail(userId) {
    if (!Types.ObjectId.isValid(userId)) {
      throw new NotFoundError(USER_NOT_FOUND);
    }

    const user = await User.findOne({
      _id: userId,
      deletedAt: { $exists: false },
    }).exec();

    if (!user) {
      throw new NotFoundError(USER_NOT_FOUND);
    }

    const { _id, email, authority, phoneNumber, address, name, createdAt, updatedAt } = user;
    return { _id, email, authority, phoneNumber, address, name, createdAt, updatedAt };
  },

  async update(userId, user) {
    console.log("User Update", userId, user);
    return true;
  },

  async remove({ userId, password }) {
    if (!Types.ObjectId.isValid(userId)) {
      throw new NotFoundError(USER_NOT_FOUND);
    }

    let user = await User.findOne({
      _id: userId,
      deletedAt: { $exists: false },
    }).exec();
    if (!user) {
      throw new NotFoundError(USER_NOT_FOUND);
    }

    if (!comparePassword(password, user.password)) {
      throw new AuthError(USER_PASSWORD_MISMATCH);
    }

    user = await User.findByIdAndUpdate(userId, {
      deletedAt: new Date(),
    });

    if (!user) {
      throw new NotFoundError(USER_NOT_FOUND);
    }

    return true;
  },

  async passwordUpdate(userId, user) {
    console.log("User Password Update", userId, user);
    return true;
  },
};

export default userService;
