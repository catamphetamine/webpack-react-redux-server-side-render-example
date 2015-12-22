// this .entry.js file simply enables ES6 language features for the main .js file

require('babel-core/register')

module.exports = require(require('path').resolve(__dirname, 'development'))