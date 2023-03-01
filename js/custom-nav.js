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
      <div style="position: fixed; top:0; height: 50px; width:100%; background-color:white;">
        <a id="back-button" href="${href}" 
          style="
              display: block;
              text-decoration: none;
              text-align: center;
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
      </div>
      `;
    }
  }
  
  customElements.define('custom-nav', CustomNav);