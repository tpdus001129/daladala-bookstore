const postNumber = document.querySelector(".postNumber");

postNumber.addEventListener("click", () => {
  new daum.Postcode({
    oncomplete: function (data) {
      let fullAddress = data.roadAddress;
      let building = "";

      if (data.userSelectedType == "R") {
        if (data.bname !== "" || data.buildingName !== "") {
          fullAddress += ` (${data.bname}, ${data.buildingName})`;
        }
        fullAddress += building !== "" ? " (" + building + ")" : "";
      } else {
        fullAddress = data.jibunAddress;
      }
      document.userForm.postNumber.value = data.zonecode;
      document.userForm.address1.value = fullAddress;
      document.userForm.address2.focus();
    },
  }).open();
});

const submitBtn = document.querySelector(".submitBtn");
const emailInput = document.querySelector(".email-input");
const userName = document.querySelector(".name");
const phoneNumber = document.querySelector(".phone-number");
const address2 = document.querySelector(".address2");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (!emailInput.value.includes("@") || !emailInput.value.includes(".")) {
    document.querySelector(".email-error").innerText =
      "'@'와 '.'를 포함한 올바른 이메일 주소를 입력해주세요.";
  }
  if (!userName.value) {
    document.querySelector(".name-error").innerText = "이름을 입력해주세요.";
  }
  if (!/^\d{3}-\d{4}-\d{4}$/.test(phoneNumber.value)) {
    document.querySelector(".phone-number-error").innerText =
      "'-'을 포함한 올바른 형식의 전화번호를 입력해주세요.";
  }
  if (!address2.value) {
    document.querySelector(".address-error").innerText =
      "상세 주소를 입력해주세요.";
  }
});

const inputs = document.querySelectorAll("input");
inputs.forEach((input) => {
  input.addEventListener("click", function () {
    const errorText = this.nextElementSibling;
    if (errorText.classList.contains("error-text")) {
      errorText.innerText = "";
    }
  });
});
