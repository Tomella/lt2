import TableElement from "./lt-table.js";
import RaceElement from "./lt-race.js";

const template = document.createElement('template');
template.innerHTML = `<div></div>`;

export default class SessionElement extends HTMLElement {
   static get observedAttributes() { return ['type']; }

   $(selector) {
      return this.shadowRoot && this.shadowRoot.querySelector(selector);
   }

   constructor() {
      super();
      const root = this.attachShadow({ mode: 'open' });
      root.appendChild(template.content.cloneNode(true));
   }

   connectedCallback() {
   }
   
   set data(value = {}) {      
      let target = this.$("div");
      target.innerHTML = "";
      if(value.head) {
         let renderer;
         if(value.head.session_name.substr(0,4).toLowerCase().indexOf("race") == 0) {
            renderer = document.createElement("lt-race");
         }  else {
            renderer = document.createElement("lt-table");
         }
         
         target.appendChild(renderer);
         renderer.data = value.rider;
      }
   }

   attributeChangedCallback(attr, oldValue, newValue) {
      this["_" + attr](newValue);
   }
}

customElements.define('lt-session', SessionElement);
