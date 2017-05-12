'use strict'

// https://github.com/babel/babel/issues/5731
require('babel-polyfill')

// use `bluebird` for Promises
require('../../bluebird')
require('bluebird').promisifyAll(require('fs-extra'))

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

require('./start')
