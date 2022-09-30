const template = document.createElement('template');

template.innerHTML = `
<style>
* {
   font-family: Inconsolata, "Courier New", Courier, monospace;
}

.pit_in {
   background-color: rgb(255, 0, 0, 0.1)
}

.pit_out {
   background-color: rgb(0, 255, 0, 0.1)
}

.bold {
   font-weight: bold;
}


.best_lap {
   width: 9em;
}

.rider_name {
   width: 7em;
   display: inline-block;
   white-space: nowrap;
   text-overflow: ellipsis;
   overflow: hidden;
}

.rider_surname {
   display: inline-block;
}

.num {
   text-align: right;
   padding-right:12px;
}

.short_num {
   width: 3em;
   text-align: right;
   padding-right:12px;
}

.num_lap {
   width: 2.5em;
   text-align: right;
   display: inline-block;
}

.name_container {
   width: 18em;
}

</style>
<td class="position short_num"></td>
<td class="rider_number num"></td>
<td class="name_container"><span class="rider_name"></span><span class="rider_surname"></span></td>

<td class="best_lap">
   <span class="lap_time"></span>
   <span class="num_lap">-</span>
</td>

<td class="fixed-width  num">
   <span class="lap-time"></span>
   <span class="gap_first"></span>
</td>
<td class="fixed-width num"><span class="gap_prev"></span></td>
<td class="fixed-width num last_lap_time"></td>
<td class="fixed-width num last_lap"></td>
<td style="text-align: center;" class="on_pit"></td>
`; 

export default class TableRowElement extends HTMLElement {
   static get observedAttributes() { return ['position', 'rider_number', 'rider_name', 'rider_surname', 'num_lap', 'on_pit', 
               'number', 'lap_time', 'gap_first', 'gap_prev', 'last_lap_time', 'last_lap', 'status_name']; }

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
   
   _last_lap(value) {
      this.setBest(value, this.getAttribute("num_lap"));
   }
   _num_lap(value) {
      this.setBest(this.getAttribute("last_lap"), value);
   }
   setBest(lastLap, numLap) {
      this.$(".last_lap").innerHTML = lastLap;

      let span = this.$(".num_lap");
      if(+numLap) {
         span.removeAttribute("hidden");
         span.innerHTML = "(" + numLap + ")";
         if(lastLap == numLap) {
            this.$(".best_lap").classList.add("bold");
         }
      } else {
         span.setAttribute("hidden", "hidden");
      }
   }
   
   _on_pit(value) {
      let td = this.$(".on_pit");
      let out = !!!value
      if(value) {
         td.innerHTML = 'In';
         td.classList.add("pit_in");
      } else {
         td.innerHTML = 'Out';
         td.classList.add("pit_out");
      }
   }


   _position(value) {
      this.setStatus(value, this.getAttribute("status_name"));
   }

   _status_name(value) {
      this.setStatus(this.getAttribute("position"), value);
   }

   setStatus(position, statusName) {
      this.$(".position").innerHTML = statusName == 'NC' ? 'NC' : position;
   }

   attributeChangedCallback(attr, oldValue, newValue) {
      if(this["_" + attr]) {
         this["_" + attr](newValue);
      } else if(oldValue != newValue) {
         let element = this.$("." + attr);
         if(element) {
            let val = newValue ? newValue : "";
            element.innerHTML = val;
            element.title = val;
         }
      }
   }
}

customElements.define('lt-table-row', TableRowElement);
