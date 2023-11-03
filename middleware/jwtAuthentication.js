import jwt from "jsonwebtoken";
import "dotenv/config";

const { ACCESS_TOKEN_SECRET } = process.env;

const jwtAuthentication = (req, res, next) => {
  try {
    const auth = req.headers["authorization"];
    if (!auth) {
      throw new Error("권한 없음");
    }

    const accessToken = auth.split(" ")[1];
    jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (error, decoded) => {
      if (error) {
        throw new Error(error.message);
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    next(error);
  }
};

export { jwtAuthentication };
