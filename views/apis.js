export default {
  users: {
    delete: async ({ userId, password }) =>
      makeFetch("DELETE", `/api/v1/users/${userId}`, { userId, password }),
  },

  auth: {
    signup: async ({ email, password, phoneNumber }) =>
      makeFetch("POST", "/api/v1/signup", { email, password, phoneNumber }),
    logout: async () => makeFetch("POST", "/api/v1/logout"),
  },
  categories: async () => makeFetch("GET", "/api/v1/categories"),
};

async function makeFetch(method = "GET", url = "", body) {
  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
}
