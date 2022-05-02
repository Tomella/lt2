import config from "../assets/config.js"

const template = document.createElement('template');

template.innerHTML = `
<style>
* {
   font-family: Inconsolata, "Courier New", Courier, monospace;
}

td {
   width: 5em;
}

.rider_name {
   width: 7em;
   display: inline-block;
}

.num {
   text-align: right;
   padding-right:12px;
}

.name_container {
   width: 18em;
}

</style>
<td class="position num"></td>
<td class="rider_number num"></td>
<td class="name_container"><span class="rider_name"></span><span class="rider_surname"></span></td>
<td class="team_name"></td>
<td class="fixed-width  num">
   <span class="lap-time"></span>
   <span class="gap_first"></span>
</td>
<td class="fixed-width num"><span class="gap_prev"></span></td>
<td class="fixed-width num last_lap_time"></td>
<td class="fixed-width num last_lap"></td>
<td style="text-align: center;" class="status_name"></td>
`; 

export default class RaceRowElement extends HTMLElement {
   static get observedAttributes() { return ['position', 'rider_number', 'rider_name', 'rider_surname', 'num_lap', 'on_pit', 
               'number', 'team_name',  'lap_time', 'gap_first', 'gap_prev', 'last_lap_time', 'last_lap', 'status_name']; }

   $(selector) {
      return this.shadowRoot && this.shadowRoot.querySelector(selector);
   }

   constructor() {
      super();
      const root = this.root = this.attachShadow({ mode: 'open' });
      root.appendChild(template.content.cloneNode(true));
   }

   connectedCallback() {
      //this.shadowRoot.addEventListener('jobexpand', (e) => console.log(e));
   }

   _position(newValue) {
      let element = this.$(".position");
      if(newValue) {
         element.innerHTML = newValue;
         let pts =  config.points[newValue];
         if(pts) element.title = pts + " point" + (pts > 1 ? "s" : "");
      }
   }
   
   attributeChangedCallback(attr, oldValue, newValue) {
      if(this["_" + attr]) {
         this["_" + attr](newValue);
      } else if(oldValue != newValue) {
         let element = this.$("." + attr);
         if(element) element.innerHTML = newValue ? newValue : "";
      }
   }
}

customElements.define('lt-race-row', RaceRowElement);
