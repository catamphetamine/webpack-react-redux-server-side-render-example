// ES6 polyfill.
require('core-js/stable')
// `async/await` support.
require('regenerator-runtime/runtime')

require('@babel/register')
require('./index')