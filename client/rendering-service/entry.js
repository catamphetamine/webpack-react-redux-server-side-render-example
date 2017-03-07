'use strict'

// use bluebird for Promises
require('babel-runtime/core-js/promise').default = require('bluebird')

// Fixes "ReferenceError: regeneratorRuntime is not defined"
require('babel-polyfill')

// Prevents Babel from transpiling server-side bundle
// resulting in faster server-side hot-reload (startup) times.
require('babel-register')
(
	require('universal-webpack').babel_register_options
	(
		require('../webpack/universal-webpack-settings'),
		require('../webpack/webpack.config')
	)
)

require('bluebird').promisifyAll(require('fs-extra'))

console.log(`Webpage rendering service is building...`)
require('./start')
