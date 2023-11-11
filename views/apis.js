import { storage, storageKey } from "./storage.js";

const userId = storage.getItem(storageKey.userId);

export default {
  users: {
    profile: (userId) => customFetch("GET", `/users/${userId}`),
    editPassword: ({ userId, password, newPassword }) =>
      customFetch("PATCH", `/users/${userId}/password`, {
        password,
        newPassword,
      }),
    delete: ({ password }) =>
      customFetch("DELETE", `/users/${userId}`, { password }),
    orderList: () => customFetch("GET", `/users/${userId}/orders`),
    orderPost: (props) => customFetch("POST", `/users/${userId}/orders`, props),
    orderDetail: ({ orderId }) => customFetch("GET", `/orders/${orderId}`),
    orderDelete: ({ orderId }) =>
      customFetch("DELETE", `/users/${userId}/orders/${orderId}`),
    orderEdit: ({ orderId, recipient }) =>
      customFetch("PATCH", `/users/${userId}/orders/${orderId}`, {
        recipient,
      }),
    orderCancel: ({ orderId }) =>
      customFetch("PATCH", `/users/${userId}/orders/${orderId}`, {
        deliveryState: "주문취소",
      }),
  },
  auth: {
    signup: ({ email, password, phoneNumber }) =>
      customFetch("POST", `/signup`, { email, password, phoneNumber }),
    logout: () => customFetch("POST", `/logout`),
  },
  categories: () => customFetch("GET", `/categories`),
  books: {
    list: () => customFetch("GET", `/books`),
    detail: ({ bookId }) => customFetch("GET", `/books/${bookId}`),
    category: ({ category }) =>
      customFetch("GET", `/books?category=${category}`),
  },
  admin: {
    orderList: () => customFetch("GET", `/orders`),
    orderStateEdit: ({ userId, orderId, deliveryState }) =>
      customFetch("PATCH", `/users/${userId}/orders/${orderId}`, {
        deliveryState,
      }),
  },
};

function customFetch(method = "GET", url = "", body) {
  return fetch(`/api/v1${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
}
