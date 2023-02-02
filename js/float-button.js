class FloatButton extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      let href = this.getAttribute('href');
      this.innerHTML = `
      <style>
        #float-button-icon{
          color: cornflowerblue;
        }
        #float-button:hover #float-button-icon{
          color: darkslateblue;
        }
      </style>
      <a id="float-button" href="${href}" 
        style="
            display: block;
            text-decoration: none;
            text-align: center;
            width: 50px; 
            height: 50px;
            position: absolute;
            left: 4px;
            top: 20px;
            white-space: nowrap;">
            <div style="
            display: inline-block;
            height: 100%;
            vertical-align: middle;">
            </div>
            <i id="float-button-icon" style="font-size: 30px;" class="align-middle bi bi-arrow-left-short"></i>
        </a>
      `;
    }
  }
  
  customElements.define('float-button', FloatButton);