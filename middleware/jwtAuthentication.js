import jwt from "jsonwebtoken";
import "dotenv/config";
import { AuthError } from "../utils/errors.js";
import { UNAUTHORIZED_ERROR } from "../config/errorMessagesConstants.js";

const { ACCESS_TOKEN_SECRET } = process.env;

const jwtAuthentication = (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (error, decoded) => {
      if (error) {
        throw new AuthError(UNAUTHORIZED_ERROR);
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    next(error);
  }
};

export { jwtAuthentication };
