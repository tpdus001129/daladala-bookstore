function footerPosition() {
  const body = document.querySelector("body");
  const footer = document.querySelector("footer-component");

  const bodyHeight = body.clientHeight;
  const windowHeight = window.innerHeight;
  if (bodyHeight < windowHeight) {
    footer.style.position = "fixed";
    footer.style.width = "100%";
    footer.style.bottom = "0";
  } else {
    footer.style.position = "relative";
  }
}

// 페이지 로드 및 리사이즈 이벤트 시 조절 함수 호출
window.addEventListener("load", footerPosition);
window.addEventListener("resize", footerPosition);
