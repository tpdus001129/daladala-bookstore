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
            height: 180px; 
          }
          header {
            width: 100%;
            background: #fff;
            display: flex;
            justify-content: center;
            position: fixed;
            top: 0;
            z-index: 100;
          }
          .max-container {
            width: var(--max-width);
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          .header-logo-box {
            margin: 16px 0;
            justify-content: center;
            text-align: center;
          }
          .login-user {
            display: flex;
            justify-content: flex-end;
            gap: 20px;
            margin: 0;
            padding: 0;
          }
          .login-user a {
            text-decoration: none;
            color: var(--black);
          }
          .login-user a:hover {
            color: var(--point-color);
          }
          .second-header {
            width: 100%;
          }
          .category-drop-box {
            height: 100%;
            display: flex;
            justify-content: center;
          }
          .category-drop-box a {
            color: var(--black);
            display: block;
            padding: 15px 10px;
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
            display: flex;
            justify-content: center;
            gap: 10px;
            list-style: none;
            width: 100%;
          }
          .category-drop-box li {
            display: inline-block;
            position: relative;
          }
          #first-category > li {
            width: 100%;
            max-width: 160px;
            text-align: center;
            position: relative;
          }
          #first-category > li:hover #second-category {
            left: 0;
          }
          #first-category li a:hover {
            color: var(--point-color);
            transition: .3s
          }
          #second-category {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 40px;
            left: -9999px;
            background: #28292e;
            width: 100%;
            border-radius: 10px;
          }
          #second-category a {
            color: var(--white);
          }
        </style>`;

      template.innerHTML += `
      <div class="header-padding"></div>
      <header>
        <div class="max-container">
          <div class="first-header">
            <div class="header-logo-box">
              <a href="/">
                <img src="/public/images/logo.png" alt="로고" width="240px;">
              </a>
            </div>
            <ul class="login-user">
            WHETHER_AUTH
            </ul>
          </div>

          <div class="second-header">
            <nav class="category-drop-box">
              CATEGORY
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
            <li><a href="/my-page">마이페이지</a></li>
            <li><a href="/cart">장바구니</a></li>
            <li><a href="/" id="logout-button">로그아웃</a></li>
          `,
        );
      } else {
        template.innerHTML = template.innerHTML.replace(
          `WHETHER_AUTH`,
          `
            <li><a href="/login">로그인</a></li>
            <li><a href="/signup">회원가입</a></li>
            <li><a href="/cart">장바구니</a></li>
          `,
        );
      }

      const categories = await (await apis.categories()).json();
      const categoriesHTML = this.firstCategory(categories);

      template.innerHTML = template.innerHTML.replace(
        "CATEGORY",
        categoriesHTML,
      );

      this.shadowRoot.appendChild(template.content.cloneNode(true));

      const logoutButton = this.shadowRoot.querySelector("#logout-button");

      if (logoutButton) {
        logoutButton.addEventListener("click", async (e) => {
          e.preventDefault();
          await apis.auth.logout();
          storage.removeItem(storageKey.userId);
          location.href = "/";
        });
      }
    })();
  }

  firstCategory(categories) {
    return `
      <ul id="first-category">
        ${categories.reduce((acc, category) => {
          console.log(category)
          return `
              ${acc}
              <li>
                <a class="box" href=/product-list?category=${category._id.toString()}>
                  ${category.name}
                </a>
                <ul id="second-category">
                  ${category.subCategories.reduce((innerAcc, subCategory) => {
                    return (
                      innerAcc +
                      `<li><a href="/product-list?category=${subCategory._id}">${subCategory.name}</a></li>`
                    );
                  }, "")}
                </ul>
              </li>
            `;
        }, "")}
      </ul>
    `;
  }
}

customElements.define("header-component", HeaderComponent);
