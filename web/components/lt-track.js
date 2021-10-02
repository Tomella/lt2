
const template = document.createElement('template');

template.innerHTML = `
<style>
div {  
   position: absolute;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   background-size: contain;
   background-repeat: no-repeat;
   background-position: center; 
}
svg {
}
</style>
<div></div>
`;

customElements.define('lt-track', class TrackElement extends HTMLElement {
   static get observedAttributes() { return ['src']; }

   #src;

   $(selector) {
      return this.shadowRoot && this.shadowRoot.querySelector(selector);
   }

   constructor() {
      super();
      const root = this.attachShadow({ mode: 'open' });
      root.appendChild(template.content.cloneNode(true));
   }

   connectedCallback() {
      //this.shadowRoot.addEventListener('jobexpand', (e) => console.log(e));
   }

   async _src() {
      let src = this.getAttribute("src");
      if(this.#src != src) {
         this.$("div").style["background-image"] = "url(" + src + ")";
         return;

         this.#src = src;
         let response = await fetch(src);
         let body = await response.text();
         this.$("div").innerHTML = body;
      }
   }

   attributeChangedCallback(attr, oldValue, newValue) {
      this["_" + attr]();
   }
});

