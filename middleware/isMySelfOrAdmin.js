import { AuthError } from "../utils/errors.js";
import { AUTHORITY_ADMIN } from "../config/constants.js";
import { UNAUTHORIZED_ERROR } from "../config/errorMessagesConstants.js";

const isMySelfOrAdmin = (req, res, next) => {
  try {
    const { userId } = req.params;

    if (req.user._id !== userId && req.user.authority !== AUTHORITY_ADMIN) {
      throw new AuthError(UNAUTHORIZED_ERROR);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export { isMySelfOrAdmin };
