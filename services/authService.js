import { User } from "../models/index.js";
import { hashPassword, comparePassword } from "../utils/utils.js";
import { createAccessToken } from "../utils/jwt.js";

const authService = {
  async signup({ email, password, phoneNumber }) {
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
      throw new Error("이메일 또는 비밀번호가 일치하지 않는다.");
    }

    const accessToken = createAccessToken({
      _id: user._id,
      email: user.email,
    });

    return { accessToken };
  },
};

export default authService;
