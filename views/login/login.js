import { storage, storageKey } from "../storage.js";

const emailInput = document.querySelector(".email-input");
const pwInput = document.querySelector(".password-input");
const loginForm = document.querySelector("#login-form");
const errorMes = document.querySelector(".login-error-message");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const emailInputVal = emailInput.value;
  const pwInputVal = pwInput.value;

  if (!emailInputVal.includes("@") || !emailInputVal.includes(".")) {
    errorMes.innerHTML = "올바른 아이디를 입력해주세요.";
  } else if (!/^(?=.*[a-zA-Z])(?=.*\d).{8,20}$/.test(pwInputVal)) {
    errorMes.innerHTML = "올바른 비밀번호를 입력해주세요.";
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
        const { userId } = await res.json();
        storage.setItem(storageKey.userId, userId);
        window.location.href = "/";
      } else {
        errorMes.innerHTML = "올바른 아이디 또는 비밀번호를 입력해주세요.";
      }
    } catch (error) {
      errorMes.innerHTML = "서버에 연결할 수 없습니다.";
    }
  }
});
