import {
  USER_EMAIL_REQUIRED,
  USER_PASSWORD_REQUIRED,
  USER_PHONE_NUMBER_REQUIRED,
  USER_EMAIL_FORMAT,
  USER_PASSWORD_FORMAT,
  USER_PHONE_NUMBER_FORMAT,
  BOOK_PUBLISHER_REQUIRED,
  BOOK_TITLE_REQUIRED,
  BOOK_AUTHOR_REQUIRED,
  BOOK_CONTENT_REQUIRED,
  BOOK_PAGES_REQUIRED,
  BOOK_PUBLICATION_DATE_REQUIRED,
  BOOK_RELEASE_DATE_REQUIRED,
  BOOK_IMAGE_REQUIRED,
  BOOK_PRICE_REQUIRED,
  BOOK_INVENTORY_COUNT_REQUIRED,
  BOOK_CATEGORY_REQUIRED,
} from "../../config/errorMessagesConstants.js";

const error = {
  userErrorMessage: {
    email: {
      "any.required": USER_EMAIL_REQUIRED,
      "string.base": USER_EMAIL_FORMAT,
      "string.email": USER_EMAIL_FORMAT,
      "string.pattern.base": USER_EMAIL_FORMAT,
    },
    password: {
      "any.required": USER_PASSWORD_REQUIRED,
      "string.base": USER_PASSWORD_FORMAT,
      "string.pattern.base": USER_PASSWORD_FORMAT,
    },
    phoneNumber: {
      "any.required": USER_PHONE_NUMBER_REQUIRED,
      "string.base": USER_PHONE_NUMBER_FORMAT,
      "string.pattern.base": USER_PHONE_NUMBER_FORMAT,
    },
  },
  bookErrorMessage: {
    publisher: {
      "any.required": BOOK_PUBLISHER_REQUIRED,
    },
    title: {
      "any.required": BOOK_TITLE_REQUIRED,
    },
    author: {
      "any.required": BOOK_AUTHOR_REQUIRED,
    },
    content: {
      "any.required": BOOK_CONTENT_REQUIRED,
    },
    pages: {
      "any.required": BOOK_PAGES_REQUIRED,
    },
    publicationDate: {
      "any.required": BOOK_PUBLICATION_DATE_REQUIRED,
    },
    releaseDate: {
      "any.required": BOOK_RELEASE_DATE_REQUIRED,
    },
    image: {
      "any.required": BOOK_IMAGE_REQUIRED,
    },
    price: {
      "any.required": BOOK_PRICE_REQUIRED,
    },
    inventoryCount: {
      "any.required": BOOK_INVENTORY_COUNT_REQUIRED,
    },
    category: {
      "any.required": BOOK_CATEGORY_REQUIRED,
    },
  },
};

export { error };
