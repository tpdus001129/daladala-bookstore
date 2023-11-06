import apis from "../apis.js";
import { storage, storageKey } from "../storage.js";

class HeaderComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "/common/header-component.css");
    this.shadowRoot.appendChild(link);

    const template = document.createElement("template");

    template.innerHTML = `
      <header>
        <div class="max-container">
          <div class="first-header">
            <div class="header-logo-box">
              <a href="/">
                DALADALA BOOK STORE
              </a>
            </div>
            <div class="header-login-user">
              <ul class="login-user">
              WHETHER_AUTH
              </ul>
            </div>
          </div>

          <div class="second-header">
            <nav class="category-drop-box">
              <ul id="first-category">
                <li>
                  <div class="box">
                    <a class="head" href="/product-list">햄버거</a>
                  </div>
                  <ul id="second-category">
                    <li><a href="/product-list">전체보기</a></li>
                    <li>
                      <a class="second-category-name" href="">국내</a>
                      <ul id="third-category">
                        <li><a class="detail" href="">과학</a></li>
                        <li><a class="detail" href="">경영/경제</a></li>
                        <li><a class="detail" href="">소설</a></li>
                        <li><a class="detail" href="">자기개발</a></li>
                        <li><a class="detail" href="">종교</a></li>
                      </ul>
                    </li>
                    <li>
                      <a class="second-category-name" href="">해외</a>
                      <ul id="third-category">
                        <li><a class="detail" href="">과학</a></li>
                        <li><a class="detail" href="">경영/경제</a></li>
                        <li><a class="detail" href="">소설</a></li>
                        <li><a class="detail" href="">자기개발</a></li>
                        <li><a class="detail" href="">종교</a></li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li><a class="head" href="/new">신상</a></li>
                <li><a class="head" href="">베스트</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      `;

    const isAuthenticated = () => {
      const userId = storage.getItem(storageKey.userId);
      return !!userId;
    };

    if (isAuthenticated()) {
      template.innerHTML = template.innerHTML.replace(
        `WHETHER_AUTH`,
        `
        <li><button id="logout-button">로그아웃</button></li>
        <li><a href="/cart" id="cart-button">장바구니</a></li>
      `,
      );
    } else {
      template.innerHTML = template.innerHTML.replace(
        `WHETHER_AUTH`,
        `
      <li><a href="/login" id="login-button">로그인</a></li>
      <li><a href="/signup" id="signup-button">회원가입</a></li>
      <li><a href="/cart" id="cart-button">장바구니</a></li>
    `,
      );
    }

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const logoutButton = this.shadowRoot.querySelector("#logout-button");

    if (logoutButton) {
      logoutButton.addEventListener("click", async () => {
        await apis.auth.logout();
        storage.removeItem(storageKey.userId);
        location.href = "/";
      });
    }
  }
}

customElements.define("header-component", HeaderComponent);
