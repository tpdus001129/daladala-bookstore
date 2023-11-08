const email = document.getElementById("email");
const password = document.getElementById("password");
const userName = document.getElementById("name");
const tel = document.getElementById("tel");
const zipCode = document.getElementById("postNumber");
const address1 = document.getElementById("address1");
const address2 = document.getElementById("address2");
const userID = localStorage.getItem("USER_ID");

// GET 요청
async function getUserData() {
  try {
    const res = await fetch(`/api/v1/users/${userID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonData = await res.json();
    console.log(jsonData);

    email.value = jsonData.email;
    tel.value = jsonData.phoneNumber;
    if (jsonData.name) userName.value = jsonData.name;
    if (jsonData.address) {
      zipCode.value = jsonData.address.zipCode;
      address1.value = jsonData.address.detail1;
      address2.value = jsonData.address.detail2;
    }
  } catch (error) {
    console.error(error);
  }
}
getUserData();

// PUT 요청
const submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(`/api/v1/users/${userID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password.value,
        name: userName.value,
        phoneNumber: tel.value,
        address: {
          zipCode: zipCode.value,
          detail1: address1.value,
          detail2: address2.value,
        },
      }),
    });

    if (res.ok) {
      alert("변경되었습니다.");
      location.reload();
    } else {
      alert("비밀번호가 틀렸거나 누락된 정보가 있습니다.");
    }
  } catch (error) {
    console.error(error);
  }
});
