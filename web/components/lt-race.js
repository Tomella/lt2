import RaceRowElement from "./lt-race-row.js";

const template = document.createElement('template');
template.innerHTML = `
<style>
th {
   width: 5em;
}

lt-race-row {
   display: table-row;
   vertical-align: inherit;
   border-color: inherit;
}
   
.odd {
   background-color: rgba(0, 0, 0, .05) ;
}

</style>
<table class="center">
   <thead>
      <tr>
         <th>Pos.</th>
         <th>No.</th>
         <th>Rider</th>
         <th>Team</th>
         <th>Elapsed</th>
         <th>Gap Prev.</th>
         <th>Last Lap</th>
         <th>Laps</th>
         <th>Status</th>
      </tr>
   </thead>
   <tbody>
   </tbody>
</table>
`;

export default class RaceElement extends HTMLElement {
   static get observedAttributes() { return ['duration']; }

   $(selector) {
      return this.shadowRoot && this.shadowRoot.querySelector(selector);
   }

   constructor() {
      super();
      const root = this.attachShadow({ mode: 'open' });
      root.appendChild(template.content.cloneNode(true));
   }

   set data(value) {
      let body = this.$("tbody");
      Object.entries(value).forEach(([key, value]) => {
         console.log("PACE", key, value)
         let element = document.createElement("lt-race-row");
         body.appendChild(element);

         Object.entries(value).forEach(([key, value]) => {
            element.setAttribute(key, value)
         });
         element.setAttribute("position", key);

         if(key % 2) element.classList.add("odd");
      });
   }

   connectedCallback() {
      //this.shadowRoot.addEventListener('jobexpand', (e) => console.log(e));
   }
   
   attributeChangedCallback(attr, oldValue, newValue) {
      this["_" + attr](newValue);
   }
}

customElements.define('lt-race', RaceElement);
