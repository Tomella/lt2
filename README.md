## Simple live timing for MotoGP

The MotoGP live timing has a rich JSON datafeed but they only show a bit of the data in their free live timing.

### Getting started
There are some things to do to get started. If you want to automate it more go ahead.
* Make sure you have NodeJS and NPM installed globally
* > cd lt2
* > npm install

Serve up your content:
> node server
> Open a browser on http://localhost:3000

### How it builds
We use http2, webcomponents and modules to keep it simple. Just write code and run it direct. Anytime you change the server side code simply restart the server, for the web side it is all native so simply refreshing the browser will pick up the changes.

I typically run this at home, on the laptop when racing is on so there is no service or deployment scripts for serving from elsewhere.
