import { ObjectId } from "mongodb";
import { Schema } from "mongoose";
import { BOOK_CATEGORY_REQUIRED } from "../../config/errorMessagesConstants.js";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, BOOK_CATEGORY_REQUIRED],
    },
    parent: {
      type: ObjectId,
      ref: "Category",
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  },
);

export default CategorySchema;
