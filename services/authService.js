const authService = {
  async signup(user) {
    console.log("Signup", user);
    return { access_token: "abcd" };
  },

  async login(email, password) {
    console.log("Login", email, password);
    return { access_token: "abcd" };
  },

  async logout() {
    console.log("Logout");
    return true;
  }
}

export default authService;
