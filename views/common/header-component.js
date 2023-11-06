import apis from "../apis.js";
import { storage, storageKey } from "../storage.js";

class HeaderComponent extends HTMLElement {
  constructor() {
    super();
    (async () => {
      this.attachShadow({ mode: "open" });

      const template = document.createElement("template");
      template.innerHTML = `
        <style>
          ul {
  list-style: none;
}
li {
  margin: 0;
  padding: 0;
}

.header-padding {
  content: "";
  display: block;
  height: 130px; 
}

header {
  width: 100%;
  background: white;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  z-index: 100;
}
.max-container {
  width: var(--max-width);
  height: 130px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.first-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.header-logo-box {
  margin: 16px 0;
  justify-content: center;
  text-align: center;
}
.login-user {
  display: flex;
  gap: 20px;
  float: right;
  margin: 0;
  padding: 0;
}
.second-header {
  display: flex;
  justify-content: center;
  padding: 10px 0;
}

.category-drop-box {
  width: 450px;
  height: 100%;
  display: flex;
  justify-content: center;
}
.category-drop-box a {
  color: #121212;
  display: block;
  padding: 15px 25px;
  text-align: center;
  text-decoration: none;
  -webkit-transition: all 0.25s ease;
  -moz-transition: all 0.25s ease;
  -ms-transition: all 0.25s ease;
  -o-transition: all 0.25s ease;
  transition: all 0.25s ease;
}
.category-drop-box ul,
.category-drop-box li {
  margin: 0;
  padding: 0;
}
.category-drop-box ul {
  list-style: none;
  width: 100%;
}
.category-drop-box li {
  display: inline-block;
  position: relative;
}

#first-category {
  width: 450px;
  height: 100%;
}
#first-category > li {
  float: left;
  width: 33%;
  text-align: center;
  position: relative;
}
#first-category > li:hover #second-category {
  left: 0;
}
#first-category > li a {
  display: block;
}
#first-category li a:hover {
  color: #121212;
  font-weight: bold;
}
#second-category {
  position: absolute;
  top: 40px;
  left: -9999px;
  background: #ccc;
  width: 100%;
}
#second-category > li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 50px;
}
#second-category > li:hover #third-category {
  left: 100%;
}
#second-category > li a,
#third-category > li a {
  margin: 10px;
  padding: 10px;
}
#third-category {
  position: absolute;
  top: 0;
  background: #6bd089;
  width: 100%;
  left: -9999px;
}
#third-category > li {
  width: 100%;
  height: 50px;
}
#third-category > li:hover {
  color: #fff;
}

        </style>`;
      template.innerHTML += `
      <div class="header-padding"></div>
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
                    CATEGORY
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

      const categories = await (await apis.categories()).json();

      const categoriesHTML = categories.reduce(
        (acc, { _id, name, subCategories }) => {
          return (
            acc +
            `
              <li>
                <a class="second-category-name" href="/product-list?category=${_id}">${name}</a>
                <ul id="third-category">
                  ${subCategories.reduce((innerAcc, { _id: innerId, name }) => {
                    return (
                      innerAcc +
                      `<li><a class="detail" href="/product-list?category=${innerId}">${name}</a></li>`
                    );
                  }, "")}
                </ul>
              </li>
              
            `
          );
        },
        "",
      );

      template.innerHTML = template.innerHTML.replace(
        "CATEGORY",
        categoriesHTML,
      );

      const link = document.createElement("link");
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("href", "/common/header-component.css");
      this.shadowRoot.appendChild(link);

      this.shadowRoot.appendChild(template.content.cloneNode(true));

      const logoutButton = this.shadowRoot.querySelector("#logout-button");

      if (logoutButton) {
        logoutButton.addEventListener("click", async () => {
          await apis.auth.logout();
          storage.removeItem(storageKey.userId);
          location.href = "/";
        });
      }
    })();
  }
}

customElements.define("header-component", HeaderComponent);
