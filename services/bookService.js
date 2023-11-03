import { Book } from "../models/index.js";

const bookService = {
  // TODO: 카테고리별(query parameter)로 카테고리별 목록 구현
  // TODO: 페이지네이션 구현하기
  // TODO: 정렬(최신순, 조회수 등) 구현, 나중에 시간 남으면?..
  async list() {
    try {
      const books = await Book.find({}).sort({ createdAt: -1 }).exec();
      return books;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async detail(_id) {
    try {
      const book = await Book.findOne({ _id }).exec();
      return book;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async create(bookData) {
    try {
      await Book.create(bookData);

      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async update(bookId, bookData) {
    try {
      const book = await Book.findByIdAndUpdate(bookId, bookData);
      if (!book) {
        throw new Error("수정할 도서가 존재하지 않습니다.");
      }

      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async remove(bookId) {
    try {
      const book = await Book.findByIdAndDelete(bookId);
      if (!book) {
        throw new Error("삭제할 도서가 존재하지 않습니다.");
      }

      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default bookService;
