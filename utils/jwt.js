import jwt from "jsonwebtoken";
import "dotenv/config";

const { ACCESS_TOKEN_SECRET } = process.env;

const createAccessToken = ({ _id, email }) => {
  return jwt.sign({ _id, email }, ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

export { createAccessToken };
