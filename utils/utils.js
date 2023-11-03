import bcrypt from "bcrypt";

const hashPassword = (password) => {
  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  return hashedPassword;
};

const comparePassword = (password, newPassword) => {
  return bcrypt.compareSync(password, newPassword);
};

export { hashPassword, comparePassword };
