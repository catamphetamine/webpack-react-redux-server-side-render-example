// this .entry.js file simply enables ES6 language features

require('babel-core/register')

module.exports = require(require('path').resolve(__dirname, 'webpack-dev-server'))