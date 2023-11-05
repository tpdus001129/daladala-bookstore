const emailValidator = (value) => {
  return {
    result: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
    message: "Asdf",
  };
};

const userNameValidator = (value) => {
  return value.length <= 10;
};

const phoneNumberValidator = (value) => {
  return /^\d{3}-\d{4}-\d{4}$/.test(value);
};

const zipCodeValidator = (value) => {
  return value.length <= 5;
};

const addressDetailValidator = (value) => {
  return value.length <= 100;
};

export {
  emailValidator,
  userNameValidator,
  phoneNumberValidator,
  zipCodeValidator,
  addressDetailValidator,
};
