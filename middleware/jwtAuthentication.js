import jwt from "jsonwebtoken";
import "dotenv/config";
import { AuthError } from "../utils/errors.js";
import { UNAUTHORIZED_ERROR } from "../config/errorMessagesConstants.js";

const { ACCESS_TOKEN_SECRET } = process.env;

const jwtAuthentication = (req, res, next) => {
  try {
    const auth = req.headers["authorization"];
    if (!auth) {
      throw new AuthError(UNAUTHORIZED_ERROR);
    }

    const accessToken = auth.split(" ")[1];
    jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (error, decoded) => {
      if (error) {
        throw new AuthError(error.message);
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    next(error);
  }
};

export { jwtAuthentication };
