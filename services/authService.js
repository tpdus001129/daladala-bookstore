import { User } from "../models/index.js";
import { hashPassword, comparePassword } from "../utils/utils.js";
import { createAccessToken } from "../utils/jwt.js";
import { AuthError, DuplicateError } from "../utils/errors.js";
import {
  LOGIN_ERROR,
  DUPLICATE_EMAIL,
} from "../config/errorMessagesConstants.js";

const authService = {
  async signup({ email, password, phoneNumber }) {
    const existsUser = await User.findOne({ email }).exec();
    if (existsUser) {
      throw new DuplicateError(DUPLICATE_EMAIL);
    }

    const hashedPassword = hashPassword(password);
    const user = await User.create({
      email,
      password: hashedPassword,
      phoneNumber,
    });

    const accessToken = createAccessToken({
      _id: user._id,
      email: user.email,
    });

    return { accessToken };
  },

  async login({ email, password }) {
    const user = await User.findOne({ email }).exec();
    if (!user || !comparePassword(password, user.password)) {
      throw new AuthError(LOGIN_ERROR);
    }

    const accessToken = createAccessToken({
      _id: user._id,
      email: user.email,
    });

    return { accessToken };
  },
};

export default authService;
