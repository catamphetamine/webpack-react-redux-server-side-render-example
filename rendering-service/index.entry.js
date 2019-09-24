// Not using ES6 `import` syntax here
// to avoid `require()`ing `@babel/register`
// which would parse the whole server-side bundle by default.

// ES6 polyfill.
require('core-js/stable');
// `async/await` support.
require('regenerator-runtime/runtime');
require('./index')
