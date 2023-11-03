import authService from "../services/authService.js";

const cookieOptions = {
  httpOnly: true,
  sameSite: "None",
};

function requestBodyToObject(body) {
  return {
    email: body.email,
    password: body.password,
    phoneNumber: body.phoneNumber,
  };
}

const authController = {
  async signup(req, res) {
    const { email, password, phoneNumber } = requestBodyToObject(req.body);
    const { accessToken } = await authService.signup({
      email,
      password,
      phoneNumber,
    });

    res.cookie("accessToken", accessToken);
    res.status(201).json({ accessToken });
  },

  async login(req, res) {
    const { email, password } = req.body;
    const { accessToken } = await authService.login({ email, password });

    res.cookie("accessToken", accessToken);
    res.status(200).json({ accessToken });
  },

  async logout(req, res) {
    res.clearCookie("accessToken", cookieOptions);
    res.status(200).send();
  },
};

export default authController;
