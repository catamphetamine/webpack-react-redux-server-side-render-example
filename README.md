This sample project illustrates isomorphic (universal) Webpack rendering using React.

Features

* React
* React-router
* Redux
* Isomorphic (universal) rendering
* Webpack 2
* Development mode: hot reload for React components, hot reload for Redux reducers

*Small Advertisement:* 📞 if you're looking for a React phone number component check out [`react-phone-number-input`](http://halt-hammerzeit.github.io/react-phone-number-input/)

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

Motivation
==========

In summer 2015 I wrote [`webpack-isomorphic-tools`](https://github.com/halt-hammerzeit/webpack-isomorphic-tools) to make isomorphic (universal) React rendering work on server-side when the project was built with Webpack.

The goal was met and many people started using it to implement isomorphic (universal) rendering in their apps.

Still it lacked some funky Webpack features like variuos Webpack plugins and other edge cases.

So I did some research on Webpack builds for Node.js and came up with a proof-of-concept solution which I now decided to publish as a library called [universal-webpack](https://github.com/halt-hammerzeit/universal-webpack). This sample project is a demonstration of using `universal-webpack`.

Webpack 2
================

This project requires Webpack 2

```sh
npm install webpack@2.2.0-rc.3
```

I've been using Webpack 1 for a long time here while Webpack 2 was in beta. Now the time has come to move to Webpack 2 since it's almost ready for release. See older versions of this repo for Webpack 1 compatibility.