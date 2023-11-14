import apis from "../apis.js";
import { storage, storageKey } from "../storage.js";
import { emailValidator, passwordValidator } from "../inputValidator.js";

const form = document.getElementById("signup-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const passwordConfirmInput = document.getElementById("password-confirm");
const telInput = document.getElementById("tel");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let isValid = true;

  if (!emailValidator(emailInput.value).isValid) {
    isValid = false;
    document.getElementById("email-error").textContent =
      emailValidator().message;
  } else {
    document.getElementById("email-error").textContent = "";
  }

  if (!passwordValidator(passwordConfirmInput.value).isValid) {
    isValid = false;
    document.getElementById("password-error").textContent =
      passwordValidator().message;
  } else {
    document.getElementById("password-error").textContent = "";
  }

  if (passwordInput.value !== passwordConfirmInput.value) {
    isValid = false;
    document.getElementById("password-confirm-error").textContent =
      "입력한 비밀번호와 일치하지 않습니다. 다시 확인해주세요.";
  } else {
    document.getElementById("password-confirm-error").textContent = "";
  }

  if (!/^\d{3}-\d{4}-\d{4}$/.test(telInput.value)) {
    isValid = false;
    document.getElementById("tel-error").textContent =
      "'-'를 포함한 올바른 형식의 전화번호를 입력해주세요.";
  } else {
    document.getElementById("tel-error").textContent = "";
  }

  if (!isValid) return;

  (async () => {
    const res = await apis.auth.signup({
      email: emailInput.value,
      password: passwordInput.value,
      phoneNumber: telInput.value,
    });

    if (res.ok) {
      alert("회원가입 성공");
      const { userId, authority } = await res.json();
      storage.setItem(storageKey.userId, userId);
      storage.setItem(storageKey.authority, authority);
      location.href = "/";
    } else {
      alert("회원가입에 실패했습니다.");
      console.log(res);
    }
  })();
});
