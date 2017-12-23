// Not using ES6 `import` syntax here
// to avoid `require()`ing `babel-register`
// which would parse the whole server-side bundle by default.

// https://github.com/babel/babel/issues/5731
require('babel-polyfill')

// use `bluebird` for Promises
require('../bluebird')

require('./index')
