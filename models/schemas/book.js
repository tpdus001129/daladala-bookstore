import { ObjectId } from "mongodb";
import { Schema } from "mongoose";

const BookSchema = new Schema(
  {
    publisher: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    pages: {
      type: Number,
      required: true,
    },
    publicationDate: {
      type: Date,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    inventoryCount: {
      type: Number,
      required: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    seller: {
      type: ObjectId,
      ref: "User",
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  },
);

export default BookSchema;
