import express from "express";
import fetch from 'node-fetch';

const LIVE_TIMING_URL = "https://api.motogp.pulselive.com/motogp/v1/timing-gateway/livetiming-lite"; // "http://www.motogp.com/en/json/live_timing/";

const app = express();
const port = process.env.PORT || 3000;

// serve static files
app.use(express.static("web"));

app.get('/data/:number', async (req, res, next) => {
   let number = req.params.number;

   if (!number) {
      return res.status(400).send('No url specified.');
   }
   try {
      let fetched = await fetch(LIVE_TIMING_URL);
      let body = await fetched.json();
      res.status(fetched.status).send(body);
   } catch(e) {
      res.status(501).send({error: "Failed"});
   }
});

app.listen(port, function (err) {
   console.log("running server on port " + port);
});
