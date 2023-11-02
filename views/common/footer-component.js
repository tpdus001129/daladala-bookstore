class HeaderComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const template = document.createElement("template");
    template.innerHTML = `
    <style>
    .site-footer {
        background-color: #c50167;
        padding: 10px 0;
        font-size: 15px;
        line-height: 24px;
        color: #121212;
        /* 길이넣기 */
        max-width: 1280px;
        max-height: 300px;
      }
      .site-footer hr {
        border-top-color: #bbb;
        opacity: 0.5;
      }
      .site-footer hr.small {
        margin: 20px 0;
      }
      .site-footer h6 {
        color: #121212;
        font-size: 16px;
        font-weight: 800;
        text-transform: uppercase;
        margin: 5px 0;
        letter-spacing: 2px;
      }
      .site-footer a {
        color: #737373;
      }
      .site-footer a:hover {
        color: #f6f6f6;
        text-decoration: none;
        font-weight: bolder;
      }
      .first-row {
        display: flex;
        justify-content: center;
        gap: 10%;
        padding: 0 20px;
      }
      .categories {
        width: 20%;
      }
      .links {
        width: 20%;
        margin-left: 100px;
      }
      .footer-links {
        padding-left: 0;
        list-style: none;
      }
      .footer-links li {
        display: block;
      }
      .footer-links a {
        color: #121212;
      }
      .site-footer .social-icons {
        text-align: right;
      }
      .site-footer .social-icons a {
        width: 40px;
        height: 40px;
        line-height: 40px;
        margin-left: 6px;
        margin-right: 0;
        border-radius: 100%;
        background-color: #33353d;
      }
      .second-row {
        padding: 0 20px;
        display: flex;
        flex-direction: row;
      }
      .copyright-box {
        width: 50%;
      }
      .copyright-text {
        margin: 0;
      }
      .social-icons-box {
        width: 50%;
      }
      .social-icons {
        padding-left: 0;
        margin-bottom: 0;
        list-style: none;
      }
      .social-icons li {
        display: inline-block;
        margin-bottom: 4px;
      }
      .social-icons a {
        background-color: #eceeef;
        color: #818a91;
        font-size: 16px;
        display: inline-block;
        line-height: 44px;
        width: 44px;
        height: 44px;
        text-align: center;
        margin-right: 8px;
        border-radius: 100%;
        -webkit-transition: all 0.2s linear;
        -o-transition: all 0.2s linear;
        transition: all 0.2s linear;
      }
      
      .social-icons.size-sm a {
        line-height: 34px;
        height: 34px;
        width: 34px;
        font-size: 14px;
      }
      .social-icons a.gitlab:hover {
        background-color: #d46215;
      }
      .social-icons a.notion:hover {
        background-color: #dbe4e7;
      }
      .social-icons a.linkedin:hover {
        background-color: #007bb6;
      }
      @media (max-width: 767px) {
        .social-icons li.title {
          display: block;
          margin-right: 0;
          font-weight: 600;
        }
      }      
    </style>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("header-component", HeaderComponent);
