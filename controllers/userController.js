import userService from "../services/userService.js";

const userController = {
  async detail(req, res) {
    const { userId } = req.params;
    const user = await userService.detail(userId);
    res.status(200).json(user);
  },

  async update(req, res) {
    const { userId } = req.params;
    const user = await userService.update(userId, req.body);
    if (user) {
      res.status(200).json(user);
    }
  },

  async remove(req, res) {
    const { userId } = req.params;
    const { password } = req.body;
    const user = await userService.remove({ userId, password });
    if (user) {
      res.status(200).json(user);
    }
  },

  async passwordUpdate(req, res) {
    const { userId } = req.params;
    const { password, newPassword } = req.body;
    const userPassword = { password, newPassword };

    const user = await userService.passwordUpdate(userId, userPassword);
    if (user) {
      res.status(200).json(user);
    }
  },

  async getMyBooks(req, res) {
    const { userId } = req.params;
    const books = await userService.getMyBooks(userId);
    res.status(200).json(books);
  }
};

export default userController;
