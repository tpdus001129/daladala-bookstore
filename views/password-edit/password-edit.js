import { passwordValidator } from "../inputValidator.js";
import apis from "../apis.js";
import { storage, storageKey } from "../storage.js";

const form = document.getElementById("password-edit-form");
const passwordOriginInput = document.getElementById("password-origin");
const passwordInput = document.getElementById("password");
const passwordConfirmInput = document.getElementById("password-confirm");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let isValid = true;

  if (!passwordValidator(passwordOriginInput.value).isValid) {
    isValid = false;
    document.getElementById("password-origin-error").textContent =
      passwordValidator().message;
  } else {
    document.getElementById("password-origin-error").textContent = "";
  }

  if (!passwordValidator(passwordInput.value).isValid) {
    isValid = false;
    document.getElementById("password-error").textContent = passwordValidator(
      passwordInput.value,
    ).message;
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

  if (!isValid) {
    return;
  }

  const userId = storage.getItem(storageKey.userId);
  const originPassword = passwordOriginInput.value;
  const newPassword = passwordInput.value;

  apis.users
    .editPassword({ userId, password: originPassword, newPassword })
    .then((res) => res.json())
    .then((data) => {
      if (data.statusCode >= 400) {
        alert(`변경에 실패했습니다. ${data.message}`);
        return;
      }
      alert("변경에 성공했습니다. 다시 로그인해주세요.");
      storage.removeItem(storageKey.userId);
      location.href = "/";
    })
    .catch((err) => {
      alert(`변경에 실패했습니다. ${err.message}`);
    });
});
