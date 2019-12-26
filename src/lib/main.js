export default `class IconLogo extends HTMLElement {
  constructor() {
    super();
    this.imgUrl = '';
  }

  // 当 custom element增加、删除、修改自身属性时，被调用
  attributeChangeCallback(name, oldValue, newValue) {
    this._render();
  }

  // 当 custom element首次被插入文档DOM时，被调用
  connectedCallback() {
    this._render();
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = \`
      <style>
        img {
          width: 100px;
          height: 100px;
        }
      </style>
      <div>
        logo:
        <img src="\$\{this.imgUrl\}" />
      </div>
    \`
  }

  get logo() {
    return this.getAttribute('logo');
  }
  set logo(logo) {
    this.setAttribute('logo', logo)
  }

  _render() {
    this.imgUrl = \`./\$\{this.logo\}\`;
  }
}
customElements.define('icon-logo', IconLogo);`
