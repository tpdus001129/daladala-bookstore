import apis from "../apis.js";
import { storage, storageKey } from "../storage.js";

const form = document.getElementById("signup-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const passwordConfirmInput = document.getElementById("password-confirm");
const telInput = document.getElementById("tel");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let isValid = true;

  if (!emailInput.value.includes("@") || !emailInput.value.includes(".")) {
    isValid = false;
    document.getElementById("email-error").textContent =
      "'@'와 '.'를 포함한 올바른 이메일 주소를 입력해주세요.";
  } else {
    document.getElementById("email-error").textContent = "";
  }

  if (!/^(?=.*[a-zA-Z])(?=.*\d).{8,20}$/.test(passwordInput.value)) {
    isValid = false;
    document.getElementById("password-error").textContent =
      "영문, 숫자를 포함한 8자 이상 20이하의 문자를 입력해주세요.";
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
      const { userId } = await res.json();
      storage.setItem(storageKey.userId, userId);
      location.href = "/";
    } else {
      alert("회원가입에 실패했습니다.");
      console.log(res);
    }
  })();
});
