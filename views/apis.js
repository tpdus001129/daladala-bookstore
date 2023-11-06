export default {
  users: {
    delete: async ({ userId, password }) =>
      makeFetch("DELETE", `/api/v1/users/${userId}`, { userId, password }),
  },

  auth: {
    signup: async ({ email, password, phoneNumber }) =>
      makeFetch("POST", "/api/v1/signup", { email, password, phoneNumber }),
  },
};

async function makeFetch(method = "GET", url = "", body = {}) {
  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}
