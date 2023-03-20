class CustomNav extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    let href = this.getAttribute('href');
    this.innerHTML = `
    <style>
      #back-button-icon{
        color: cornflowerblue;
      }
      #back-button:hover #back-button-icon{
        color: darkslateblue;
      }
      body{
        padding-top: 40px;
      }
    </style>
    <div style="position: fixed; top:0; max-height: 150px; width:100%; background-color:white;">
      <a id="back-button" href="${href}" 
        style="
            display: inline-block;
            text-decoration: none;
            text-align: center;
            float: left;
            width: 50px; 
            height: 50px;
            left: 4px;
            white-space: nowrap;">
        <div style="
          display: inline-block;
          height: 100%;
          vertical-align: middle;">
        </div>
        <i id="back-button-icon" style="font-size: 30px;" class="align-middle bi bi-arrow-left-short"></i>
      </a>
      <p id="custom-title" class="text-center m-0 mt-2" style="font-size:large; overflow:hidden"></p>
    </div>
    `;
  }
}

customElements.define('custom-nav', CustomNav);

const page = window.location.pathname;
if(page.startsWith("/study/")){
  const nav = document.getElementsByTagName('custom-nav')[0];
  const navTitle = document.getElementById('custom-title');
  const originTitle = nav.nextElementSibling.children[0];
  navTitle.innerHTML = originTitle.innerHTML;
  navTitle.style.opacity = 0;

  const opacityVariable = (1/originTitle.offsetTop);

  window.addEventListener('scroll', function(e) {
    let offset = originTitle.offsetTop - window.scrollY;
    navTitle.style.opacity = 1 < (1 - opacityVariable * offset) 
      ? 1 
      : (1 - opacityVariable * offset);
  });
}