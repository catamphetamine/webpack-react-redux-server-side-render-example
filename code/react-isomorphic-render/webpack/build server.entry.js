require('babel-core/register')

module.exports = require(require('path').resolve(__dirname, 'build server'))({ development: true })