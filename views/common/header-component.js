class HeaderComponent extends HTMLElement {
  constructor() {
    super();
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
      header {
        width: 100%;
        background: white;
        display: flex;
        justify-content: center;
      }
      .max-container {
        width: var(--max-width);
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
        margin: 20px 0 0 0;
        padding: 10px 0;
        /* background-color: hsl(336, 29%, 86%); */
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
        padding: 10px 25px;
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
      #first-category>li {
        float: left;
        width: 33%;
        text-align: center;
        position: relative;
      }
      #first-category >li:hover #second-category {
        left: 0;
      }
      #first-category >li a {
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
      #second-category >li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
        width:auto;
      }
      #second-category >li:hover #third-category {
        left: 100%;
      }
      #second-category >li a, #third-category >li a {
        margin: 10px;
        padding: 10px;
      }
      #third-category {
        position: absolute;
        top: 0;
        background: #6BD089;
        width: 80%;
        left: -9999px;
      }
      #third-category >li:hover {
        color: #fff;
      }
    </style>
  
  
    <!-- 헤더 -->
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
              <li><a href="/login" id="login-button">로그인</a></li>
              <li><a href="/signup" id="signup-button">회원가입</a></li>
              <li><a href="/cart" id="cart-button">장바구니</a></li>
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

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("header-component", HeaderComponent);
