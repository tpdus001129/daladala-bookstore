import { Category } from "../models/index.js";

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
          },
        },
      },
    ]);

    return categories;
  },
};

export default categoryService;
