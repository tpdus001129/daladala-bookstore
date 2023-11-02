import { ObjectId } from "mongodb";
import { Schema } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
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
