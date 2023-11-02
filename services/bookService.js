const bookService = {
  async list(category) {
    console.log("Book List", category);
    return [];
  },

  async detail(bookId) {
    console.log("Book Detail", bookId);
    return {};
  },

  async create(book) {
    console.log("Book Create", book);
    return true;
  },

  async update(bookId, book) {
    console.log("Book Update", bookId, book);
    return true;
  },

  async remove(bookId) {
    console.log("Book Delete", bookId);
    return true;
  }
}

export default bookService;
