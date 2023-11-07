import Joi from "joi";
import { error } from "./customErrorMessage.js";

const book = {
  post: {
    body: Joi.object().keys({
      publisher: Joi.string()
        .required()
        .messages(error.bookErrorMessage.publisher),
      title: Joi.string().required().messages(error.bookErrorMessage.title),
      author: Joi.string().required().messages(error.bookErrorMessage.author),
      content: Joi.string().required().messages(error.bookErrorMessage.content),
      pages: Joi.number().required().messages(error.bookErrorMessage.pages),
      publicationDate: Joi.date()
        .required()
        .messages(error.bookErrorMessage.publicationDate),
      releaseDate: Joi.date()
        .required()
        .messages(error.bookErrorMessage.releaseDate),
      image: Joi.string().required().messages(error.bookErrorMessage.image),
      price: Joi.number().required().messages(error.bookErrorMessage.price),
      inventoryCount: Joi.number()
        .required()
        .messages(error.bookErrorMessage.inventoryCount),
      category: Joi.string()
        .required()
        .messages(error.bookErrorMessage.category),
    }),
  },
};

export default book;
