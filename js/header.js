// header.js
class Header extends HTMLElement {
    constructor() {
        super();
        const template = document.getElementById('header-template');
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.cloneNode(true));

        // Link the CSS file
        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'header.css');
        shadowRoot.appendChild(linkElem);
    }
}
customElements.define('custom-header', Header);