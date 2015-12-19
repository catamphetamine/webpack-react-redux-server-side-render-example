// use bluebird for Promises
require('babel-runtime/core-js/promise').default = require('bluebird')

var minimist = require('minimist')
var path = require('path')

global.Root_folder = path.resolve(__dirname, '..', '..')

var command_line_arguments = minimist(process.argv.slice(2))

global._production_ = command_line_arguments.production
global._development_ = command_line_arguments.development || process.env.NODE_ENV === 'development'

require('babel-core/register')

require('./language')

require('bluebird').promisifyAll(require('fs-extra'))

global.configuration = require('./configuration')
// console.log('Configuration:', configuration)
