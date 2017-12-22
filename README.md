This sample project illustrates a React/Redux application with optional server-side rendering bundled with Webpack.

Features

* React
* Redux
* Isomorphic rendering (optional)
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
* wait for Webpack to finish the build (green stats will appear in the terminal, and it will print "Webpage rendering service is listening at port 3002" when the application has started)
* go to `http://localhost:3000`
* interact with the production version of the web application
* check out `./client/build/bundle-stats.html` for detailed info on which modules [take up the most space](https://blog.etleap.com/2017/02/02/inspecting-your-webpack-bundle/) in the output bundle

Summary
=======

This application consists of the "client side" and the "server side".

The "client side" (`./client`) is the javascript code (`./client/index.js`) which is built by Webpack and is run in a user's web browser, along with the "page rendering service" (`./client/rendering-service`) which does the same thing but in a Node.js process on the server (but is still considered more "client-side" than "server-side").

The "server side" consists of the "API service" (`./api`) and the "proxy service" (`./webserver`) which runs on port `3000` and routes various URL paths to their respective destinations:

* "statics" ("static files", "assets") are served (in production mode only) on `/assets` URL path
* `/api` is proxied to the "API service" (running on port `3003`)
* all the other URLs are proxied to the "page rendering service" (which runs on port `3002`).

In development mode there's one more Node.js process running: it's `webpack-dev-server` running on port `3001` which serves the "assets" compiled by Webpack (live) via HTTP protocol. In production there's no `webpack-dev-server` and Webpack just outputs those compiled assets to the `./client/build` folder and the "proxy service" (`./webserver`) serves those "assets" from there. In a real production environment though this "hand made" sample proxy service would have been dropped in favour of a proper proxy like NginX or HAProxy.

The "proxying webserver" approach illustrated in this app is for illustration purposes only. It is considered old-fashioned now as all modern applications are becoming more distributed and decentralized running API somewhere in a cloud (e.g. Amazon Lambda) and serving "statics" from a whole another place (e.g. Amazon S3). In this case the React application queries the API server by an absolute URL and no proxying or "serving statics" is needed, therefore the whole "webserver" thing is moved out of the equation.

Small Advertisement
===================

* 📞 if you're looking for a React phone number component check out [`react-phone-number-input`](http://catamphetamine.github.io/react-phone-number-input/)

* Also you might check out [`simpler-redux-form`](https://github.com/catamphetamine/simpler-redux-form) and [`react-responsive-ui`](https://github.com/catamphetamine/react-responsive-ui) and [`react-time-ago`](https://github.com/catamphetamine/react-time-ago)