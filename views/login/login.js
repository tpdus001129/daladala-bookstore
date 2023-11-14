import { emailValidator, passwordValidator } from "../inputValidator.js";
import { storage, storageKey } from "../storage.js";

const emailInput = document.querySelector(".email-input");
const pwInput = document.querySelector(".password-input");
const loginForm = document.querySelector("#login-form");
const passwordErrorMessage = document.querySelector("#password-error");
const emailErrorMessage = document.querySelector("#email-error");

emailInput.addEventListener("input", () => {
  if (!emailValidator(emailInput.value).isValid) {
    emailErrorMessage.innerHTML = emailValidator(emailInput.value).message;
  } else {
    emailErrorMessage.innerHTML = "";
  }
});

pwInput.addEventListener("input", () => {
  if (!passwordValidator(pwInput.value).isValid) {
    passwordErrorMessage.innerHTML = passwordValidator(pwInput.value).message;
  } else {
    passwordErrorMessage.innerHTML = "";
  }
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const emailInputVal = emailInput.value;
  const pwInputVal = pwInput.value;

  if (!emailValidator(emailInputVal).isValid) {
    emailErrorMessage.innerHTML = emailValidator().message;
  } else if (!passwordValidator(pwInputVal).isValid) {
    passwordErrorMessage.innerHTML = passwordValidator().message;
  } else {
    try {
      const res = await fetch("/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailInputVal,
          password: pwInputVal,
        }),
      });

      if (res.ok) {
        const { userId, authority } = await res.json();
        storage.setItem(storageKey.userId, userId);
        storage.setItem(storageKey.authority, authority);
        window.location.href = "/";
      } else {
        passwordErrorMessage.innerHTML =
          "올바른 아이디 또는 비밀번호를 입력해주세요.";
      }
    } catch (error) {
      passwordErrorMessage.innerHTML = "서버에 연결할 수 없습니다.";
    }
  }
});
