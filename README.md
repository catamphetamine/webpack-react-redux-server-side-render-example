This sample project illustrates isomorphic (universal) rendering using React and Webpack.

Features

* React
* React-router
* Redux
* Isomorphic (universal) rendering
* Webpack 2
* Development mode: hot reload for React components, hot reload for Redux reducers and actions

Quick Start
===========

* `npm install`
* `npm run dev`
* wait for it to finish (it will say "Now go to http://127.0.0.1:3000" in the end)
* go to `http://localhost:3000`
* interact with the development version of the web application
* `Ctrl + C`
* `npm run production`
* wait a bit for Webpack to finish the build (green stats will appear in the terminal, plus some `node.js` server running commands)
* go to `http://localhost:3000`
* interact with the production version of the web application
* check out `./client/build/bundle-stats.html` for detailed info on which modules [take up the most space](https://blog.etleap.com/2017/02/02/inspecting-your-webpack-bundle/) in the output bundle

Summary
=======

This application consists of the "client side" and the "server side".

The "client side" (`./client`) is the javascript code (`./client/application.js`) which is built by Webpack and is run in a user's web browser, along with the "page rendering service" (`./client/rendering-service`) which does the same thing but in a Node.js process on the server (but is still considered more "client-side" than "server-side").

The "server side" consists of the "API service" (`./api`) and the "proxy service" (`./webserver`) which runs on port `3000` and routes various URL paths to their respective destinations:

* "statics" ("static files", "assets") are served (in production mode only) on `/assets` URL path
* `/api` is proxied to the "API service" (running on port `3003`)
* all the other URLs are proxied to the "page rendering service" (which runs on port `3002`).

In development mode there's one more Node.js process running: it's `webpack-dev-server` running on port `3001` which serves the "assets" compiled by Webpack (live) via HTTP protocol. In production there's no `webpack-dev-server` and Webpack just outputs those compiled assets to the `./client/build` folder and the "proxy service" (`./webserver`) serves those "assets" from there. In a real production environment though this "hand made" sample proxy service should be dropped in favour of a proper proxy like NginX or HAProxy. Or a developer could rather use no proxy at all hosting everything completely separately in the cloud (the modern way). So this "proxied" setup is here just for simplicity and illustration purpose.

Server Side Rendering
=====================

React Server Side Rendering is quite slow, so I prefer setting `render: false` flag to move all React rendering to the web browser. This approach has virtually no complications, but those who still want to prerender pages on the server may read the [guide on speeding up React Server Side Rendering](https://github.com/halt-hammerzeit/react-isomorphic-render/blob/master/PERFORMANCE.md).

Small Advertisement
===================

* 📞 if you're looking for a React phone number component check out [`react-phone-number-input`](http://halt-hammerzeit.github.io/react-phone-number-input/)

* Also you might check out [`simpler-redux-form`](https://github.com/halt-hammerzeit/simpler-redux-form) and [`react-responsive-ui`](https://github.com/halt-hammerzeit/react-responsive-ui) and [`react-time-ago`](https://github.com/halt-hammerzeit/react-time-ago)