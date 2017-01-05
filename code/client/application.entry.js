// use bluebird for Promises
require('babel-runtime/core-js/promise').default = require('bluebird')

if (process.env.NODE_ENV !== 'production')
{
	require('bluebird').longStackTraces()
}

require('./application')