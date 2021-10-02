import HeadElement from "../components/lt-head.js";
import SessionElement from "../components/lt-session.js";
import config from "./config.js";

const urlSearchParams = new URLSearchParams(window.location.search);

let id = urlSearchParams.get("id");
id = id ? id : config.defaultId;

let lastUpdate = 0;

polster();

async function polster() {
   setTimeout(polster, config.updatePeriod);

   let response = await fetch(config.dataUrl + id);
   let data = await response.json();

   let head = data.lt.head;
   let time = head.datet;

   if (time > lastUpdate) {
      lastUpdate = time;
      document.querySelector("#background").style["background-image"] = "url(" + head.calendar_event_track + ")";

      let headElement = document.querySelector("lt-head");

      Object.entries(head).forEach(([key, value]) => {
         headElement.setAttribute(key, value)
      });

      let session = document.querySelector("lt-session");
      session.data = data.lt;
   
   }
}
