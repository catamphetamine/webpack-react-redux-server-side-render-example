This sample project illustrates a React/Redux application with optional server-side rendering bundled with Webpack.

Features

* React
* Redux
* Universal rendering (optional)
* Webpack 2
* Development mode: hot reload for React components, hot reload for Redux reducers and actions

<br/>
<br/>

<img src="https://raw.githubusercontent.com/catamphetamine/webpack-react-redux-isomorphic-render-example/master/docs/images/screenshot.png" width="840" height="330"/>

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
* check out `./build/bundle-stats.html` for detailed info on which modules [take up the most space](https://blog.etleap.com/2017/02/02/inspecting-your-webpack-bundle/) in the output bundle

Summary
=======

This application consists both of the "client side" and the "server side" (for illustration purposes).

The "client side" is the javascript code (`./src/index.js`) which is built by Webpack and run in a web browser, along with the "page rendering service" (`./rendering-service`) which does the same thing but in a Node.js process on the server providing "Server-Side Rendering" capability.

The "server side" consists of the "API server" (`./api-server`) and the "proxy server" (`./proxy-server`).

The "proxy server" approach illustrated in this app is for illustration purposes only. It is considered old-fashioned now as all modern applications are becoming more distributed and decentralized running API somewhere in a cloud (e.g. Amazon Lambda) and serving "statics" from a whole another place (e.g. Amazon S3, configured via `output.publicPath` in `webpack.config.js`). In this case the React application queries the API server by an absolute URL and no proxying or "serving statics" is needed, therefore the whole "proxy server" is moved out of the equation.

In this example though, for simplicity, "proxy server" is used and it runs on port `3000` and routes all relative URL paths to their destinations:

* "statics" ("static files", "assets") are served (in production mode only) on `/assets` URL path
* `/api` is proxied to the "API server" (running on port `3003`)
* all the other URLs are proxied to the "page rendering service" (which runs on port `3002`).

In development mode there's one more Node.js process running: `webpack-dev-server` is running on port `3001` which serves the "assets" compiled by Webpack (live) via HTTP protocol. In production there's no `webpack-dev-server` and Webpack just outputs those compiled assets to the `./build` folder and the "proxy server" serves those "assets" from there. In a real production environment though this "hand made" sample proxy server would have been dropped in favour of a proper proxy like NginX or HAProxy.
