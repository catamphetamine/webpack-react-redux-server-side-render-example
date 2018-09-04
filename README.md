This sample project illustrates a React/Redux application with optional server-side rendering bundled with Webpack.

Features

* React
* Redux
* Server-Side Rendering in production mode ([optional feature](https://github.com/catamphetamine/webpack-react-redux-server-side-render-example/blob/16dc96b2c14742c007d1e3e740a622a88a18bf2d/rendering-service/main.js#L77-L91))
* Webpack 4
* Development mode: hot reload for React components, hot reload for Redux reducers and actions
* (optional) [Code splitting](https://github.com/catamphetamine/webpack-react-redux-server-side-render-example/pull/40)

<img src="https://raw.githubusercontent.com/catamphetamine/webpack-react-redux-server-side-render-example/master/docs/images/screenshot.png" width="840" height="330"/>

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
* check out `./build/bundle-stats.html` and `./build/bundle-stats-2.html` for detailed info on which modules [take up the most space](https://blog.etleap.com/2017/02/02/inspecting-your-webpack-bundle/) in the output bundle

Summary
=======

This application consists both of the "client side" and the "server side" (for illustration purposes).

The "client side" is the javascript code (`./src/index.js`) which is built by Webpack and run in a web browser, along with the "page rendering service" (`./rendering-service`) which does the same thing but in a Node.js process on the server providing "Server-Side Rendering" capability.

The "server side" consists of the "API" (`./api`) and the "proxy server" (`./proxy-server`).

The "proxy server" approach illustrated in this app is for illustration purposes only. It is considered old-fashioned now as all modern applications are becoming more distributed and decentralized running API in a cloud (e.g. Amazon Lambda) and serving "statics" from a whole another place (e.g. Amazon S3, configured via `output.publicPath` in `webpack.config.js`) in which case the React application queries the API server by an absolute URL (this is called "CORS") and no proxying is needed, therefore the whole "proxy server" is moved out of the equation.

In this example though, for simplicity, "proxy server" is used and it runs on port `3000` and routes all relative URL paths to their destinations:

* "statics" ("static files", "assets") are served (in production mode only) on `/assets` URL path
* `/api` is proxied to the "API server" (running on port `3003`)
* all the other URLs are proxied to the "page rendering service" (which runs on port `3002`).

In development mode there's one more Node.js process running: `webpack-serve` (`webpack-dev-server` successor) is running on port `3001` which serves the "assets" compiled by Webpack (live) via HTTP protocol. In production there's no `webpack-serve` and Webpack just outputs those compiled assets to the `./build` folder and the "proxy server" serves those "assets" from there. In a real production environment though this "hand made" sample proxy server would have been dropped in favour of a proper proxy like NginX or HAProxy.
