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
        display: flex;
        justify-content: center;
      }
      .max-container{
        width: var(--max-width);
      }
      .first-header{
        display: flex;
        justify-content: space-between;
      }
      .header-logo-box{
        margin: 16px 0;
      }
      .login-user{
        display: flex;
        justify-content: center;
        gap: 15px;
      }
      .second-header{
        display: flex;
        gap: 5px
        
      }
      #category-btn{
        border : 1px solid rgb(37, 37, 37);
        border-radius : 4px;
        background-color: #f5f5f5;
        font-weight: 400;
        color : rgb(37, 37, 37);
        padding : 12px;
        width :200px;
        text-align: center;
        cursor : pointer;
        font-size : 12px;
      }
      #menu-content{
        display : none;
        position : absolute;
        z-index : 1; /*다른 요소들보다 앞에 배치*/
        font-weight: 400;
        background-color: #f9f9f9;
        min-width : 200px;
      }
      #menu-content a{
        display : block;
        text-decoration : none;
        color : rgb(37, 37, 37);
        font-size: 12px;
        padding : 12px 20px;
      }
      #menu-content a:hover{
        background-color : #ececec
      }
      .drop-box:hover #menu-content {
        display: block;
      }
      .category-move-btn a{
        border : 1px solid rgb(37, 37, 37);
        border-radius : 4px;
        background-color: #f5f5f5;
        font-weight: 400;
        padding : 12px;
        color : rgb(37, 37, 37);
        display: inline-block;
        text-align: center;
        height: 20px;
        width : 100px;
        cursor : pointer;
        font-size : 12px;
      }

    </style>
  
  
    <!-- 헤더 -->
    <header>
      <div class="max-container">
        <div class="first-header">
          <div class="header-logo-box">
            <a href="/">
              <img src="./트랙로고.png" alt="logo" id="logo" />
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
                  <a class="head" href="">햄버거</a>
                </div>
                <ul id="second-category">
                  <li><a href="">전체보기</a></li>
                  <li>
                    <a class="second-category-detail">국내</a>
                    <ul id="third-category">
                      <li><a class="detail" href="">과학</a></li>
                      <li><a class="detail" href="">경영/경제</a></li>
                      <li><a class="detail" href="">소설</a></li>
                      <li><a class="detail" href="">자기개발</a></li>
                      <li><a class="detail" href="">종교</a></li>
                    </ul>
                  </li>
                  <li>
                    <a class="second-category-detail" href="">해외</a>
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
              <li><a class="head" href="">신상</a></li>
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
