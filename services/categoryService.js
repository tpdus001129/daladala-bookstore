import { Category } from "../models/index.js";

const categoryService = {
  async list() {
    const categories = await Category.find({}, '_id name parent').sort({ parent: 1 }).exec();

    return categories.reduce((arr, cur) => {
      const category = { ...cur }._doc;

      if (!cur.parent) {
        arr.push(category);
      } else {
        const index = arr.findIndex(parentCategory => parentCategory._id.toString() === category.parent.toString());
        if (index !== -1) {
          const { _id, name } = category;
          const subCategory = { _id, name };
          arr[index].subCategories = arr[index].subCategories || [];
          arr[index].subCategories.push(subCategory);
        }
      }

      return arr;
    }, []);
  },
};

export default categoryService;
