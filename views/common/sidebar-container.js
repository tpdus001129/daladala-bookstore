import path from "../path.js";
import { authorityEnum, storage, storageKey } from "../storage.js";

class SidebarContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

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

        .admin-menu {
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
                  <li><a href=${path.EDIT_PROFILE}>회원정보 수정</a></li>
                  <li><a href=${path.EDIT_PASSWORD}>비밀번호 변경</a></li>
                  <li><a href=${path.ORDER_LIST}>주문/배송 조회</a></li>
                </ul>
              <div>

              <hr/>

              <div class="admin-menu" id="admin-menu">
                <ul>
                  <li><a href=${path.ADMIN_BOOK_LIST}>도서목록 조회</a></li>
                  <li><a href=${path.ADMIN_BOOK_EDIT}>도서 등록/수정</a></li>
                  <li><a href=${path.ADMIN_CATEGORY_EDIT}>도서카테고리 등록/수정</a></li>
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

    const adminMenu = this.shadowRoot.querySelector(".admin-menu");

    if (storage.getItem(storageKey.authority) === authorityEnum.admin) {
      adminMenu.style.display = "block";
    }
  }
}

customElements.define("sidebar-container", SidebarContainer);
