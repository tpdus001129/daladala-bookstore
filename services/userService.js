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
    console.log("User Detail", userId);
    return {};
  },

  async update(userId, user) {
    console.log("User Update", userId, user);
    return true;
  },

  async remove({ userId, password }) {
    if (!Types.ObjectId.isValid(userId)) {
      throw new NotFoundError(USER_NOT_FOUND);
    }

    let user = await User.findOne({ _id: userId }).exec();
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
