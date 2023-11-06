import { AuthError } from "../utils/errors.js";

const isAuthority = (authority) => (req, res, next) => {
  try {
    if (!authority.includes(req.user.authority)) {
      throw new AuthError("권한이 없습니다.");
    }

    next();
  } catch (error) {
    next(error);
  }
};

export { isAuthority };
