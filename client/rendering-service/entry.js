'use strict'

// https://github.com/babel/babel/issues/5731
require('babel-polyfill')

// use `bluebird` for Promises
require('../../bluebird')
require('bluebird').promisifyAll(require('fs-extra'))

require('./start')
