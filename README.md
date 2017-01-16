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

Configuration
=============

Depending on the value of `NODE_ENV` a configuration is chosen. If `NODE_ENV` is set to `production` then `configuration.production.js` is used (any settings can be overridden in `configuration.production.custom.js` which isn't tracked by git). Otherwise `configuration.development.js` is used (any settings can be overridden in `configuration.development.custom.js` which isn't tracked by git).
