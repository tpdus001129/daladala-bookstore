class FooterComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const template = document.createElement("template");
    template.innerHTML = `
    <style>
    footer {
      width: 100%;
      display: flex;
      justify-content: center;
      background-color: var(--dark-gray);
      position : relative;
      transform : translateY(0%);
    }
    .site-footer {
      width: var(--max-width);
      height: 190px;
      padding: 10px 0;
      font-size: 15px;
      line-height: 24px;
    }
      .site-footer hr {
        border-top-color: var(--light-gray);
        opacity: 0.5;
        width: 100%;
      }
      .site-footer hr.small {
        margin: 20px 0;
      }
      .site-footer h6 {
        color: var(--light-gray);
        font-size: 16px;
        font-weight: 800;
        text-transform: uppercase;
        margin: 5px 0;
        letter-spacing: 2px;
      }
      .site-footer a {
        color: var(--light-gray);
      }
      .site-footer a:hover {
        color: var(--black);
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
        color: var(--light-gray);
        display: block;
      }
      .footer-links a {
        text-decoration: none;
        color: var(--light-gray);
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
        background-color: var(--black);
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
        color: var(--light-gray);
        margin: 0;
      }
      .social-icons-box {
        width: 50%;
      }
      .social-icons {
        padding-left: 0;
        margin-top:0;
        margin-bottom: 0;
        list-style: none;
      }
      .social-icons li {
        display: inline-block;
        margin-bottom: 4px;
      }
      .social-icons a {
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
      .social-icons a.elice:hover {
        background-color: #6700e6;
      }
      @media (max-width: 767px) {
        .social-icons li.title {
          display: block;
          margin-right: 0;
          font-weight: 600;
        }
      }      
    </style>

    <footer>
    <div class="site-footer">
      <div class="container">
        <div class="first-row">
          <div class="about">
            <h6>About US</h6>
            <ul class="footer-links">
              <li>대표이사 <a href="">오강산</a></li>
              <li>BE <a href="">박철휘</a></li>
              <li>FE <a href="">송은지</a> <a href="">김세연</a> <a href="">김민희</a></li>
            </ul>
          </div>

          <div class="links">
            <h6>Contact</h6>
            <ul class="footer-links">
              <li>대한민국 대한시 민국구 만세로 66</li>
              <li>eliceteam6@abcde.com</li>
              <li>1234-6666</li>
          </div>
        </div>
        <hr/>
      </div>
      <div class="container">
        <div class="second-row">
          <div class="copyright-box">
            <p class="copyright-text">
              ⓒ elice Communication. All Rights Reserved.
            </p>
          </div>

          <div class="social-icons-box">
            <ul class="social-icons">
              <li>
                <a class="gitlab" href="https://kdt-gitlab.elice.io/sw_track/class_07/web_project/team06/daladala"><i class="icon-gitlab"></i></a>
              </li>
              <li>
                <a class="notion" href="https://www.notion.so/59aa94f2cc3647208dcf4293cda6bd85"><i class="icon-notion"></i></a>
              </li>
              <li>
                <a class="elice" href="https://elice.io/"><i class="icon-elice"></i></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>   
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("footer-component", FooterComponent);
