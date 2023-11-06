import { ObjectId } from "mongodb";
import { Schema } from "mongoose";
import {
  BOOK_PUBLISHER_REQUIRED,
  BOOK_TITLE_REQUIRED,
  BOOK_AUTHOR_REQUIRED,
  BOOK_CONTENT_REQUIRED,
  BOOK_PAGES_REQUIRED,
  BOOK_PUBLICATION_DATE_REQUIRED,
  BOOK_RELEASE_DATE_REQUIRED,
  BOOK_IMAGE_REQUIRED,
  BOOK_PRICE_REQUIRED,
  BOOK_INVENTORY_COUNT_REQUIRED,
  BOOK_CATEGORY_REQUIRED,
  BOOK_SELLER_REQUIRED,
} from "../../config/errorMessagesConstants.js";

const BookSchema = new Schema(
  {
    publisher: {
      type: String,
      required: [true, BOOK_PUBLISHER_REQUIRED],
    },
    title: {
      type: String,
      required: [true, BOOK_TITLE_REQUIRED],
    },
    author: {
      type: String,
      required: [true, BOOK_AUTHOR_REQUIRED],
    },
    content: {
      type: String,
      required: [true, BOOK_CONTENT_REQUIRED],
    },
    pages: {
      type: Number,
      required: [true, BOOK_PAGES_REQUIRED],
    },
    publicationDate: {
      type: Date,
      required: [true, BOOK_PUBLICATION_DATE_REQUIRED],
    },
    releaseDate: {
      type: Date,
      required: [true, BOOK_RELEASE_DATE_REQUIRED],
    },
    image: {
      type: String,
      required: [true, BOOK_IMAGE_REQUIRED],
    },
    price: {
      type: Number,
      required: [true, BOOK_PRICE_REQUIRED],
    },
    inventoryCount: {
      type: Number,
      required: [true, BOOK_INVENTORY_COUNT_REQUIRED],
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: [true, BOOK_CATEGORY_REQUIRED],
    },
    seller: {
      type: ObjectId,
      ref: "User",
      required: [true, BOOK_SELLER_REQUIRED],
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  },
);

export default BookSchema;
