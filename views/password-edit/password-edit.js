const form = document.getElementById("password-edit-form");
const passwordOriginInput = document.getElementById("password-origin");
const passwordInput = document.getElementById("password");
const passwordConfirmInput = document.getElementById("password-confirm");

form.addEventListener("submit", function (event) {
  let isValid = true;

  if (!/^(?=.*[a-zA-Z])(?=.*\d).{8,20}$/.test(passwordOriginInput.value)) {
    isValid = false;
    document.getElementById("password-origin-error").textContent =
      "영문, 숫자를 포함한 8자 이상 20이하의 문자를 입력해주세요.";
  } else {
    document.getElementById("password-origin-error").textContent = "";
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

  if (!isValid) {
    event.preventDefault();
  }
});
