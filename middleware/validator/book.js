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
      image: Joi.object({
        // 필드명이 'image'
        fieldname: Joi.string().valid("image").required(),
        // 업로드된 파일의 원본 이름
        originalname: Joi.string().required(),
        // 인코딩 정보
        encoding: Joi.string().required(),
        // MIME 타입 (예: 'image/jpeg')
        mimetype: Joi.string().required(),
        // 저장 디렉토리
        destination: Joi.string().required(),
        // 저장된 파일 이름
        filename: Joi.string().required(),
        // 파일의 경로
        path: Joi.string().required(),
        // 파일 크기 (바이트)
        size: Joi.number().required(),
      })
        .required()
        .messages(error.bookErrorMessage.image),
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
