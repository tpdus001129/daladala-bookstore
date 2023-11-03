import bookService from "../services/bookService.js";
import { bookRequestBodyToObject } from "../middleware/inputValidator/bookInputValidator.js";

const bookController = {
  async list(req, res, next) {
    try {
      const books = await bookService.list();
      res.status(200).json(books);
    } catch (error) {
      next(error);
    }
  },

  async detail(req, res, next) {
    try {
      const { bookId } = req.params;
      const book = await bookService.detail(bookId);
      res.status(200).json(book);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const bookData = bookRequestBodyToObject(req.body);
      const book = await bookService.create(bookData);
      if (book) {
        res.status(201).send();
      }
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { bookId } = req.params;
      const bookData = bookRequestBodyToObject(req.body);
      const book = await bookService.update(bookId, bookData);
      if (book) {
        res.status(200).send();
      }
    } catch (error) {
      next(error);
    }
  },

  async remove(req, res, next) {
    try {
      const { bookId } = req.params;

      const book = await bookService.remove(bookId);
      if (book) {
        res.status(200).send();
      }
    } catch (error) {
      next(error);
    }
  },
};

export default bookController;
