export default {
  users: {
    get: ({ userId }) => customFetch("GET", `/users/${userId}`),
    editPassword: ({ userId, password, newPassword }) =>
      customFetch("PATCH", `/users/${userId}/password`, {
        password,
        newPassword,
      }),
    delete: ({ userId, password }) =>
      customFetch("DELETE", `/users/${userId}`, { userId, password }),
  },
  auth: {
    signup: ({ email, password, phoneNumber }) =>
      customFetch("POST", `/signup`, { email, password, phoneNumber }),
    logout: () => customFetch("POST", `/logout`),
  },
  categories: () => customFetch("GET", `/categories`),
  books: {
    get: (props) =>
      customFetch("GET", `/books${props ? `/${props.bookId}` : ""}`),
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
