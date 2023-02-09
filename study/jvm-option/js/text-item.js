class TextItem extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      let text = this.getAttribute('text');
      let info = this.getAttribute('info');
      this.innerHTML = `
      <style>
        .text{
          color: green;
          display: inline-block;
        }
        .info{
          font-size: small;
          display: inline-block;
        }
      </style>
      <div class="m-1 p-0">
        <span class="text">${text}</span>
        <span class="info">${info}</span>
      </div>
      `;
    }
  }
  
  customElements.define('text-item', TextItem);