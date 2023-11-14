import bookService from "../services/bookService.js";

const bookController = {
  async list(req, res) {
    const { category } = req.query;
    const books = await bookService.list(category);
    res.status(200).json(books);
  },

  async detail(req, res) {
    const { bookId } = req.params;
    const book = await bookService.detail(bookId);
    res.status(200).json(book);
  },

  async create(req, res) {
    const bookData = req.body;
    bookData.seller = req.user._id;
    const book = await bookService.create(bookData);
    if (book) {
      res.status(201).send();
    }
  },

  async update(req, res) {
    const { bookId } = req.params;
    const bookData = req.body;
    bookData.seller = req.user._id;
    const book = await bookService.update(bookId, bookData);
    if (book) {
      res.status(200).send();
    }
  },

  async remove(req, res) {
    const { bookId } = req.params;
    const book = await bookService.remove(bookId);
    if (book) {
      res.status(200).send();
    }
  },
};

export default bookController;
