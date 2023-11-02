class SidebarContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const PATH = {
      editUser: "/my-page",
      editPassword: "/password",
      getOrder: "/order",
      getProducts: "/products",
      postProducts: "/newproducts",
      editProducts: "/editproducts",
    };

    const template = document.createElement("template");

    /** resetCSS*/
    template.innerHTML = `<style>a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:"";content:none}table{border-collapse:collapse;border-spacing:0}a{color:var(--black);text-decoration:none}</style>`;

    /** resetCSS*/
    template.innerHTML += `
      <style>
        .container {
          display: flex;
          justify-content: center;
        }

        .wrapper {
          display: flex;
          justify-content: space-between;
          width: 100%;
          max-width: var(--max-width);
        }

        .sidebar-container {
          padding: 20px;
          width: 230px;
        }

        .sidebar-container li {
          margin-bottom: 15px;
        }

        .slot-container {
          flex-grow: 1;
        }

        .seller-menu {
          display: none;
        }

      </style>
      `;
    template.innerHTML += `
      <div class="container">
        <div class="wrapper">
          <aside class="sidebar-container">
            <nav>
              <div>
                <ul>
                  <li><a href=${PATH.editUser}>회원정보수정</a></li>
                  <li><a href=${PATH.editPassword}>비밀번호변경</a></li>
                  <li><a href=${PATH.getOrder}>주문/배송조회</a></li>
                </ul>
              <div>

              <hr/>

              <div class="seller-menu">
                <ul>
                  <li><a href=${PATH.getProducts}>상품목록조회</a></li>
                  <li><a href=${PATH.postProducts}>상품등록</a></li>
                  <li><a href=${PATH.editProducts}>상품수정</a></li>
                </ul>
              </div>
            </nav>
          </aside>
          <div class="slot-container">
            <slot></slot>
          <div>
        </div>
      </div>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const pathname = window.location.pathname.slice(0, -1);
    const activedMenu = this.shadowRoot.querySelector(`a[href='${pathname}']`);
    if (activedMenu) activedMenu.style["font-weight"] = "bold";

    const sellerMenu = this.shadowRoot.querySelector(".seller-menu");
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);

    if (params.get("seller") === "true") {
      sellerMenu.style.display = "block";
    }
  }
}

customElements.define("sidebar-container", SidebarContainer);
