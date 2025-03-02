import CheckeredFlagElement from "../components/lt-checkered-flag.js";
import RedFlagElement from "../components/lt-red-flag.js";

const template = document.createElement('template');
template.innerHTML = `
<style>
lt-checkered-flag {
   width: 24px;
   height: 24px;
}

.container {
   padding: 10px;
}

#session_name {
   padding-left: 30px;
}

.date {
   float: right;
}

h1, h2, h3, h4 {
   margin: 5px;
}

h4 {
   max-width: 50em;
}
</style>
<div class="container">
   <h1 id="event_tv_name"></h1>
   <h2 id="circuit_name"></h2>
   <h3><span id="category"></span><span id="session_name"></span></h3>
   <h4>Duration: <span class="duration"></span>&nbsp;
      <span id="session_status_id"></span> 
      <span class="date">Last update: <span id="date_formated"></span></span>
   </h4>
</div>
`;

const redflag = document.createElement('template');
redflag.innerHTML = `<lt-red-flag></lt-red-flag> (not running)`;

const checkered = document.createElement('template');
checkered.innerHTML = `<lt-checkered-flag></lt-checkered-flag>`;

export default class HeadElement extends HTMLElement {
   static get observedAttributes() { return ['date_formated', 'remaining', 'session_status_id', 'event_tv_name', 'circuit_name', 'category', 'session_name', 'num_laps']; }

   #remaining
   #session_status_id;

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
   
   _remaining() {
      this.combinedStatus();
   }
   
   _num_laps(value) {
      this.$(".duration").innerHTML = value;
      this.combinedStatus();
   }

   _session_status_id(value) {
      this.#session_status_id = value;
      this.combinedStatus();
   }

   combinedStatus() {
      let target = this.$("#session_status_id");
      target.innerHTML = "";

      switch(this.#session_status_id) {
         case "F" : // F == finalised
            target.innerHTML = "Finalised";
            break;
         case "I" : // I == Red flag
            target.appendChild(redflag.content.cloneNode(true));
            break;
         default: // Otherwise if remaining > 0 show time else show checkered flag
            let remaining = +this.getAttribute("remaining");
            let duration = this.getAttribute("duration");
            if(duration) {
               if(remaining) {
                  const template = document.createElement('template');
                  if(+duration)
                     template.innerHTML = `${minutes(remaining)} laps of ${duration} remaining`;
                  else
                     template.innerHTML = `(${minutes(remaining)} remaining)`;
                  target.appendChild(template.content.cloneNode(true));
               } else {
                  target.appendChild(checkered.content.cloneNode(true));
               }
            }

      }  
   } 

   attributeChangedCallback(attr, oldValue, newValue) {
      if(this["_" + attr]) {
         this["_" + attr](newValue);
      } else if(oldValue != newValue) {
         this.$("#" + attr).innerHTML = newValue;
      }
   }
}

customElements.define('lt-head', HeadElement);



function minutes(seconds) {
   if(+seconds < 60) {
      return seconds;
   }
   return Math.floor(seconds/ 60) + ":" + (seconds % 60 > 9?"":"0") + seconds % 60;
}
