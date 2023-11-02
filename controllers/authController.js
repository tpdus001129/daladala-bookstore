import authService from "../services/authService.js";

function requestBodyToObject(body) {
  return {
    email: body.email,
    password: body.password,
    phoneNumber: body.phoneNumber,
  };
}

const authController = {
  async signup(req, res) {
    const userData = requestBodyToObject(req.body)
    const { access_token } = await authService.signup(userData);
    res.status(201).json({ access_token });
  },

  async login(req, res) {
    const { email, password } = req.body;
    const { access_token } = await authService.login(email, password);
    res.status(200).json({ access_token });
  },

  async logout(req, res) {
    await authService.logout();
    res.status(200).send();
  }
}

export default authController;
