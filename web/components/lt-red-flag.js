const template = document.createElement('template');
template.innerHTML = `
<?xml version="1.0" encoding="iso-8859-1"?>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 511.999 511.999" width="27px" height="27px">
<path style="fill:#E21B1B;" d="M103.919,51.744c0,0,41.296,33.496,109.008,18.4c64.2-14.264,124.056-30.464,224.616,5.856v215.032
	c0,0-92.488-44.104-176.736-24.432s-131.88,12.12-156.888-12.888"/>
<rect x="90.74" y="37.524" style="fill:#999999;" width="16" height="474.475"/>
<circle style="fill:#666666;" cx="98.741" cy="24.284" r="24.284"/>
</svg>`;

class RedFlagElement extends HTMLElement {
   constructor() {
      super();
      const root = this.attachShadow({ mode: 'open' });
      root.appendChild(template.content.cloneNode(true));
   }
}
customElements.define('lt-red-flag', RedFlagElement);

export default RedFlagElement;

