'use strict'

// use bluebird for Promises
require('babel-runtime/core-js/promise').default = require('bluebird')

require('babel-register')

require('bluebird').promisifyAll(require('fs-extra'))

require('./start')
