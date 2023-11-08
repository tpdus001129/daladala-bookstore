import Joi from "joi";
import { error } from "./customErrorMessage.js";

const category = {
  post: {
    body: Joi.object().keys({
      name: Joi.string().required().messages(error.categoryErrorMessage.name),
      parent: Joi.string(),
    }),
  },
  put: {
    body: Joi.object().keys({
      name: Joi.string().required().messages(error.categoryErrorMessage.name),
      parent: Joi.string(),
    }),
  },
};

export default category;
