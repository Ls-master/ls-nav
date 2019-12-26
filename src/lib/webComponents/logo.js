export default `class NavLogo extends HTMLElement {
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
        .logo-img img {
          width: 50px;
          height: 50px;
        }
      </style>
      <div class="logo-img">
        logo:
        <img src="\$\{this.options.imgSrc\}" />
      </div>
    \`
  }

  get options() {
    let options = JSON.parse(this.getAttribute('options'));
    return options;
  }
  set options(options) {
    this.setAttribute('options', options)
  }

  _render() {
    this.imgUrl = \`./\$\{this.imgUrl\}\`;
  }
}
customElements.define('common_nav-logo', NavLogo);`
