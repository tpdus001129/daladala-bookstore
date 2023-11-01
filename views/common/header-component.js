class HeaderComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        header {
          display: flex;
          justify-content: center;
        }

        .container {
          display: flex;
          justify-content: space-between;
        }

        .wrapper {
          display: flex;
        }

        .max-container {
          width: var(--max-width)
        }
      </style>

      <header>
        <div class="max-container">
          <div class="container">
            <a href="/"><img src="/logo.png" alt="logo" id="logo"/></a>
            <div class="wrapper">
              <a href="/login" id="login-button">로그인</a>
              <a href="/signup" id="signup-button">회원가입</a>
              <a href="/cart" id="cart-button">장바구니</a>
            </div>
          </div>
          <div class="wrapper">
            <button id="menu-button"><img src="/menu.png" alt="menu"/></button>
            <div id="menu">menu</div>
            <a href="/books/new">신상</a>
            <a href="/books/best">베스트셀러</a>
          </div>
        </div>
      </header>
  `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const menu = this.shadowRoot.querySelector("#menu");
    const menuButton = this.shadowRoot.querySelector("#menu-button");

    menu.style.display = "none";
    menuButton.addEventListener("click", () => {
      menu.style.display = menu.style.display === "block" ? "none" : "block";
    });
  }
}

customElements.define("header-component", HeaderComponent);
