// use bluebird for Promises
require('babel-runtime/core-js/promise').default = require('bluebird')

if (_development_)
{
	require('bluebird').longStackTraces()
}

require('./application')