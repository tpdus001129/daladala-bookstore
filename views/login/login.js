const emailInput = document.querySelector(".email-input");
const pwInput = document.querySelector(".password-input");
const loginBtn = document.querySelector(".login-btn");
const errorMes = document.querySelector(".login-error-message");

loginBtn.addEventListener("click", async () => {
  const emailInputVal = emailInput.value;
  const pwInputVal = pwInput.value;

  if (emailInputVal === "") {
    errorMes.innerHTML = "올바른 아이디를 입력해주세요.";
  } else if (pwInputVal === "") {
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
        window.location.href = "/"
      } else {
        errorMes.innerHTML = "올바른 아이디 또는 비밀번호를 입력해주세요.";
      }
    } catch (error) {
      errorMes.innerHTML = "서버에 연결할 수 없습니다.";
    }
  }
});
