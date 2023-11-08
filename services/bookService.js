import { Types } from "mongoose";
import { Book, Category } from "../models/index.js";
import { NotFoundError } from "../utils/errors.js";
import {
  BOOK_NOT_FOUND,
  CATEGORY_NOT_FOUND,
} from "../config/errorMessagesConstants.js";

const bookService = {
  // TODO: 페이지네이션 구현하기
  // TODO: 정렬(최신순, 조회수 등) 구현, 나중에 시간 남으면?..
  async list(categoryId) {
    const result = {};
    let books = await Book.find({ deletedAt: { $exists: false } })
      .populate([
        {
          path: "category",
          populate: [
            {
              path: "parent",
              select: "_id name parent",
            },
          ],
          select: "_id name",
        },
        {
          path: "seller",
          select: "_id name",
        },
      ])
      .sort({ createdAt: -1 })
      .exec();

    result.books = books;

    if (categoryId) {
      const booksFilter = books.filter(
        (book) =>
          book.category.id.toString() === categoryId ||
          book.category.parent._id.toString() === categoryId,
      );
      result.books = booksFilter;

      let categories = await await Category.aggregate([
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

      let customCategory = {};
      outer : for (let i = 0; i < categories.length; i++) {
        if (categories[i]._id.toString() === categoryId) {
          customCategory = {
            _id: categories[i]._id,
            name: categories[i].name,
          }
          break;
        }

        for (let j = 0; j < categories[i].subCategories.length; j++) {
          if (categories[i].subCategories[j]._id.toString() === categoryId) {
            customCategory = {
              _id: categories[i]._id,
              name: categories[i].name,
              subCategory: categories[i].subCategories[j]
            };
            break outer;
          }
        }
      }

      result.category = customCategory;
    }
    return result;
  },

  async detail(_id) {
    if (!Types.ObjectId.isValid(_id)) {
      throw new NotFoundError(BOOK_NOT_FOUND);
    }

    const book = await Book.findOne({
      _id,
      deletedAt: { $exists: false },
    })
      .populate([
        {
          path: "category",
          populate: [
            {
              path: "parent",
              select: "_id name parent",
            },
          ],
          select: "_id name",
        },
        {
          path: "seller",
          select: "_id name",
        },
      ])
      .exec();

    return book;
  },

  async create(bookData) {
    if (!Types.ObjectId.isValid(bookData.category)) {
      throw new NotFoundError(CATEGORY_NOT_FOUND);
    }

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

  async remove(bookId) {
    const book = await Book.findByIdAndUpdate(bookId, {
      deletedAt: new Date(),
    });

    if (!book) {
      throw new Error("삭제할 도서가 존재하지 않습니다.");
    }

    return true;
  },
};

export default bookService;
