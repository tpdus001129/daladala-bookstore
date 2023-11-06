import { Types } from "mongoose";
import { Book } from "../models/index.js";
import { NotFoundError } from "../utils/errors.js";
import { BOOK_NOT_FOUND } from "../config/errorMessagesConstants.js";

const bookService = {
  // TODO: 카테고리별(query parameter)로 카테고리별 목록 구현
  // TODO: 페이지네이션 구현하기
  // TODO: 정렬(최신순, 조회수 등) 구현, 나중에 시간 남으면?..
  async list() {
    const books = await Book.find({}).sort({ createdAt: -1 }).exec();
    return books;
  },

  async detail(_id) {
    if (!Types.ObjectId.isValid(_id)) {
      throw new NotFoundError(BOOK_NOT_FOUND);
    }

    const book = await Book.findOne({ _id }).exec();
    return book;
  },

  // TODO: 이미지 등록 구현
  async create(bookData) {
    await Book.create(bookData);
    return true;
  },

  async update(bookId, bookData) {
    const book = await Book.findByIdAndUpdate(bookId, bookData);
    if (!book) {
      throw new Error("수정할 도서가 존재하지 않습니다.");
    }

    return true;
  },

  // TODO: 물리삭제 -> 논리삭제로 변경
  async remove(bookId) {
    const book = await Book.findByIdAndDelete(bookId);
    if (!book) {
      throw new Error("삭제할 도서가 존재하지 않습니다.");
    }

    return true;
  },
};

export default bookService;
