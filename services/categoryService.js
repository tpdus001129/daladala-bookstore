import { Types } from "mongoose";
import { Category } from "../models/index.js";
import { NotFoundError } from "../utils/errors.js";
import { CATEGORY_NOT_FOUND } from "../config/errorMessagesConstants.js";

const categoryService = {
  async list() {
    const categories = await Category.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "parent",
          as: "subCategories",
        },
      },
      {
        $match: { parent: null },
      },
      {
        $project: {
          _id: true,
          name: true,
          subCategories: {
            _id: true,
            name: true,
            parent: true,
          },
        },
      },
    ]);

    return categories;
  },

  async create(categoryData) {
    const category = await Category.create(categoryData);
    return category;
  },

  async update(categoryId, categoryData) {
    if (!Types.ObjectId.isValid(categoryId)) {
      throw new NotFoundError(CATEGORY_NOT_FOUND);
    }
    const category = await Category.findByIdAndUpdate(
      { _id: categoryId },
      categoryData,
    );
    return category;
  },

  async delete(categoryId) {
    if (!Types.ObjectId.isValid(categoryId)) {
      throw new NotFoundError(CATEGORY_NOT_FOUND);
    }

    const category = await Category.findByIdAndDelete(categoryId);
    return category;
  },
};

export default categoryService;
