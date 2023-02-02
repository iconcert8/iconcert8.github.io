class FloatButton extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      let href = this.getAttribute('href');
      this.innerHTML = `
      <a href="${href}" 
        style="
            display: block;
            text-decoration: none;
            text-align: center;
            width: 50px; 
            height: 50px;
            position: absolute;
            left: 20px;
            top: 20px;
            white-space: nowrap;">
            <div style="
            display: inline-block;
            height: 100%;
            vertical-align: middle;">
            </div>
            <i style="font-size: 30px; color: cornflowerblue;" class="align-middle bi bi-arrow-left-short"></i>
        </a>
      `;
    }
  }
  
  customElements.define('float-button', FloatButton);