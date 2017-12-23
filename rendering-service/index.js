// Not using ES6 `import` syntax here
// to avoid `require()`ing `babel-register`
// which would parse the whole server-side bundle by default.

require('source-map-support/register')

var startServer = require('universal-webpack/server')
var settings = require('../webpack/universal-webpack-settings')
var configuration = require('../webpack/webpack.config')

startServer(configuration, settings)
