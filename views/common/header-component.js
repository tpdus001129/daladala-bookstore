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
  
  
    <header>
      <div class="max-container">

        <div class="first-header">
          <div class="header-logo-box">
            <a href="/">
              <img src="./돋보기아이콘.png" alt="logo" id="logo"/>
              <span>Dala Book Store</span>
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
            <div class="drop-box">
              <button id="category-btn"><img src="./돋보기아이콘.png" alt="menu"/>
                <span id="menu">menu</span>
              </button>
          
              <div id="menu-content">
                <a href="">전체보기</a>
                <a href="">국내도서</a>
                <a href="">해외도서</a>
                <a href="">소설</a>
                <a href="">자기개발</a>
                <a href="">경영/경제</a>
                <a href="">종교</a>
                <a href="">과학</a>
              </div>
            </div>            
            <div class="category-move-btn">
              <a href="/books/new">신상 도서</a>
              <a href="/books/best">베스트 셀러</a>
            </div>
        </div>
      </div>
    </header>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("header-component", HeaderComponent);
