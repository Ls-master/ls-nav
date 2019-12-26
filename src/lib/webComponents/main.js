export default `
// import base from '../base';

class MainNav extends HTMLElement {
	constructor() {
		super();
		this.template = '';
		this.style = '';
		eval(window.NavLogo);
	}
	connectedCallback() {
		this._render();
		const shadowRoot = this.attachShadow({mode: 'open'});
		
		const style = document.createElement('style');
		style.textContent = \`
			#main-container {
				width: 100%;
				height: 56px;
				display: flex;
			}
			#logo {
				width: 200px;
			}
			#menu-list {
				flex: 1;
				background: red;
			}
			#right-side {
				width: 105px;
				background: yellow;
			}
		\`;
		
		const content = document.createElement('div');
		content.innerHTML = this.template;
		
		shadowRoot.appendChild(style);
		shadowRoot.appendChild(content);
	}
	_render() {
		let options = JSON.stringify({imgSrc: "assets/loading.gif"});

		this.template = \`
			<div id="main-container">
				<div id="logo">
					<common_nav-logo options='\$\{options\}'/>
				</div>
				<div id="menu-list">menu-list</div>
				<div id="right-side">right-side</div>
			</div>
		\`
	}
}

customElements.define('main-nav', MainNav);`