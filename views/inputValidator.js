export const emailValidator = (value) => {
  return {
    isValid:
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/.test(
        value,
      ),
    message: "올바른 이메일 주소를 입력해주세요.",
  };
};

export const passwordValidator = (value) => {
  return {
    isValid:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})/.test(
        value,
      ),
    message:
      "영문 대/소문자, 숫자, 특수문자(!.@#$%^&*)를 각 1자 이상 포함한 8자 이상의 문자를 입력해주세요.",
  };
};

export const userNameValidator = (value) => {
  return {
    isValid: value.length <= 10,
    message: "10자 이하의 글자를 입력해주세요.",
  };
};

export const phoneNumberValidator = (value) => {
  return {
    isValid: /^\d{3}-\d{4}-\d{4}$/.test(value),
    message:
      "'-'를 포함한 올바른 형식으로 입력해주세요. ( 예시 010-8888-9999 )",
  };
};

export const zipCodeValidator = (value) => {
  return {
    isValid: value.length <= 5,
    message: "5자 이하의 글자를 입력해주세요.",
  };
};

export const addressDetailValidator = (value) => {
  return {
    isValid: value.length <= 100,
    message: "100자 이하의 글자를 입력해주세요",
  };
};
