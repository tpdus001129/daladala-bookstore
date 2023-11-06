import { AuthError } from "../utils/errors.js";
import { UNAUTHORIZED_ERROR } from "../config/errorMessagesConstants.js";

const isMySelf = (req, res, next) => {
  try {
    const { userId } = req.params;

    if (req.user._id !== userId) {
      throw new AuthError(UNAUTHORIZED_ERROR);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export { isMySelf };
