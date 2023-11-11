import path from "./path.js";
import { storage, storageKey } from "./storage.js";

export function checkAuth() {
  if (!storage.getItem(storageKey.userId)) {
    alert("회원 정보가 필요합니다. 로그인 해주세요.");
    location.href = path.LOGIN;
  }
}
