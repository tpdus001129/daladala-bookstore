import { storage, storageKey } from "../storage.js";
import apis from "../apis.js";
import { checkAuth } from "../auth.js";

checkAuth();

const formElement = document.querySelector("#user-delete-form");

formElement.addEventListener("submit", async (e) => {
  e.preventDefault();

  const password = e.target[0].value;

  const res = await apis.users.delete({ password });

  if (res.ok) {
    alert("회원 탈퇴에 성공했습니다. 이용해주셔서 감사합니다.");
    storage.removeItem(storageKey.userId);
    location.href = "/";
  } else {
    alert("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
  }
});
