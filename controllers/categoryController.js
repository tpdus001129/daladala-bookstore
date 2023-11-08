import categoryService from "../services/categoryService.js";

const categoryController = {
  async list(req, res) {
    const categories = await categoryService.list();
    res.status(200).json(categories);
  },
  async create(req, res) {
    const category = await categoryService.create(req.body);
    if (category) {
      res.status(201).json(category);
    }
  },
  async update(req, res) {
    const { categoryId } = req.params;
    const category = await categoryService.update(categoryId, req.body);
    if (category) {
      res.status(200).json(category);
    }
  },
  async remove(req, res) {
    const { categoryId } = req.params;
    const category = await categoryService.delete(categoryId);
    if (category) {
      res.status(200).json(category);
    }
  },
};

export default categoryController;
