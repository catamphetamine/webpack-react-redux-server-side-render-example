// Not using ES6 `import` syntax here
// to avoid `require()`ing `babel-register`
// which would parse the whole server-side bundle by default.

// Babel ES6 polyfill
require('babel-polyfill')
require('./index')
