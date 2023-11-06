import jwt from "jsonwebtoken";
import "dotenv/config";

const { ACCESS_TOKEN_SECRET } = process.env;

const createAccessToken = ({ _id, email, authority }) => {
  return jwt.sign({ _id, email, authority }, ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

export { createAccessToken };
