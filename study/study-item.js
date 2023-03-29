class StudyItem extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      let text = this.getAttribute('text');
      let href = this.getAttribute('href');
      this.outerHTML = `
      <div class="col-lg-4 col-sm-6 col-12 p-0">
        <a class="link px-4 py-2" href="${href}">
          <p class="m-0">${text}</p>
        </a>
      </div>
      `;
    }
  }
  
  customElements.define('study-item', StudyItem);