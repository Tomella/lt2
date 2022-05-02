import TableElement from "./lt-table.js";
import RaceElement from "./lt-race.js";

const template = document.createElement('template');
template.innerHTML = `
<style>
.dark {
    color : red;
    background-color: white;
    color: black;
    content: "Light";
 }
 
 .light {
    background-color: black;
    color: white;
    content: "Dark";
 }
</style>
<button class="dark">Theme</button>`;

export default class ThemeToggleElement extends HTMLElement {

   constructor() {
      super();
      const root = this.attachShadow({ mode: 'open' });
      root.appendChild(template.content.cloneNode(true));  
   }

   connectedCallback() {
     this.shadowRoot.addEventListener('click', (e) => {
        const target = e.target;
        const isDark = target.classList.contains("dark");
        const event = new CustomEvent('theme', { detail: isDark ? "light" : "dark" });

        target.classList.remove(isDark? "dark" : "light");
        target.classList.add(isDark ? "light" : "dark");
        this.dispatchEvent(event);
     });
   }
}

customElements.define('lt-theme-toggle', ThemeToggleElement);
