## Simple live timing for MotoGP

The MotoGP live timing has a rich JSON datafeed but they only show a bit of the data in their free live timing.

### Getting started
There are some things to do to get started. If you want to automate it more go ahead.
* Make sure you have NodeJS and NPM installed globally
* > cd lt2
* > npm install

Serve up your content:
> node server

### How it builds
It doesn't. We use http2, webcomponents and modules to keep it simple. Just write code and run it direct.

Copy the lt2 directory to where ever you want, set up some proxying and then go http://my.host.com/liveTiming and it should work.
