import {
  USER_EMAIL_REQUIRED,
  USER_NAME_REQUIRED,
  USER_PASSWORD_REQUIRED,
  USER_PHONE_NUMBER_REQUIRED,
  USER_ADDRESS_ZIP_CODE_REQUIRED,
  USER_ADDRESS_DETAIL_REQUIRED,
  USER_ADDRESS_DETAIL2_REQUIRED,
  USER_EMAIL_FORMAT,
  USER_PASSWORD_FORMAT,
  USER_PHONE_NUMBER_FORMAT,
  BOOK_ID_REQUIRED,
  BOOK_PUBLISHER_REQUIRED,
  BOOK_TITLE_REQUIRED,
  BOOK_AUTHOR_REQUIRED,
  BOOK_CONTENT_REQUIRED,
  BOOK_PAGES_REQUIRED,
  BOOK_PAGES_FORMAT,
  BOOK_PUBLICATION_DATE_REQUIRED,
  BOOK_RELEASE_DATE_REQUIRED,
  BOOK_IMAGE_REQUIRED,
  BOOK_PRICE_REQUIRED,
  BOOK_PRICE_FORMAT,
  BOOK_INVENTORY_COUNT_REQUIRED,
  BOOK_INVENTORY_COUNT_FORMAT,
  BOOK_CATEGORY_REQUIRED,
  ORDER_DELIVERY_PRICE_REQUIRED,
  ORDER_DELIVERY_PRICE_FORMAT,
  ORDER_COUNT_REQUIRED,
  ORDER_TOTAL_PRICE_REQUIRED,
  ORDER_TOTAL_PRICE_FORMAT,
  ORDER_DELIVERY_STATE_REQUIRED,
  ORDER_DELIVERY_STATE_INVALID,
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
    zipCode: {
      "any.required": USER_ADDRESS_ZIP_CODE_REQUIRED,
    },
    detail1: {
      "any.required": USER_ADDRESS_DETAIL_REQUIRED,
    },
    detail2: {
      "any.required": USER_ADDRESS_DETAIL2_REQUIRED,
    },
    name: {
      "any.required": USER_NAME_REQUIRED,
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
      "number.base": BOOK_PAGES_FORMAT,
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
      "number.base": BOOK_PRICE_FORMAT,
    },
    inventoryCount: {
      "any.required": BOOK_INVENTORY_COUNT_REQUIRED,
      "number.base": BOOK_INVENTORY_COUNT_FORMAT,
    },
    category: {
      "any.required": BOOK_CATEGORY_REQUIRED,
    },
  },
  orderErrorMessage: {
    bookId: {
      "any.required": BOOK_ID_REQUIRED,
    },
    count: {
      "any.required": ORDER_COUNT_REQUIRED,
    },
    deliveryPrice: {
      "any.required": ORDER_DELIVERY_PRICE_REQUIRED,
      "number.base": ORDER_DELIVERY_PRICE_FORMAT,
    },
    productsPrice: {
      "any.required": ORDER_TOTAL_PRICE_REQUIRED,
      "number.base": ORDER_TOTAL_PRICE_FORMAT,
    },
    deliveryState: {
      "any.required": ORDER_DELIVERY_STATE_REQUIRED,
      "any.only": ORDER_DELIVERY_STATE_INVALID,
    },
  },
};

export { error };
