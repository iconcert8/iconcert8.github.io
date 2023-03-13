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



const nav = document.getElementsByTagName('custom-nav')[0];
const titleElement = document.getElementById('custom-title');
const title = nav.nextElementSibling;
const titleContent = title.children[0].innerHTML;
const standardOffset = 10;
let showTitle = title.offsetTop - window.scrollY < standardOffset;
if(showTitle){
  titleElement.innerHTML = titleContent;
  showTitle = true;
}

window.addEventListener('scroll', function(e) {
  if(title.offsetTop - window.scrollY < standardOffset){
    if(!showTitle){
      titleElement.innerHTML = titleContent;
      showTitle = true;
    }
  }else{
    if(showTitle){
      titleElement.innerHTML = '';
      showTitle = false;
    }
  }
});