This sample project illustrates isomorphic (universal) Webpack rendering using React.

Features

* React
* React-router
* Redux
* Isomorphic (universal) rendering
* Webpack
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

Webpack 2 (beta)
================

This project installs Webpack v1 by default. And it also works with the latest beta of Webpack 2 (`25` at the time of writing).

The only change required is to remove `postcss` from the configuration and add `LoaderOptionsPlugin` instead:

```js
configuration.plugins.push
(
	new webpack.LoaderOptionsPlugin
	({
		test: /\.scss$/,
		options:
		{
			// A temporary workaround for `scss-loader`
			// https://github.com/jtangelder/sass-loader/issues/298
			output:
			{
				path: configuration.output.path
			},

			postcss: [autoprefixer({ browsers: 'last 2 version' })],

			// A temporary workaround for `css-loader`.
			// Can also supply `query.context` parameter.
			context: configuration.context
		}
	})
)
```

`LoaderOptionsPlugin` seems to have additional options that might be configured possibly by adding a second instance of the same plugin:

```js
// For production mode
// https://moduscreate.com/webpack-2-tree-shaking-configuration/
new webpack.LoaderOptionsPlugin
({
	minimize: true,
	debug: false
})
```