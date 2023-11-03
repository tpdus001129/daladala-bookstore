const userService = {
  async detail(userId) {
    console.log("User Detail", userId);
    return {};
  },

  async update(userId, user) {
    console.log("User Update", userId, user);
    return true;
  },

  async remove(userId) {
    console.log("User Delete", userId);
    return true;
  },

  async passwordUpdate(userId, user) {
    console.log("User Password Update", userId, user);
    return true;
  },
};

export default userService;
