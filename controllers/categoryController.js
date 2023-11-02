import categoryService from "../services/categoryService.js";

const categoryController = {
  async list(req, res) {
    const categories = await categoryService.list();
    res.status(200).json(categories);
  }
}

export default categoryController;
