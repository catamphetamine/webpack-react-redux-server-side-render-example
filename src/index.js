// ES6 polyfill.
require('core-js/stable')
// `async/await` support.
require('regenerator-runtime/runtime')

// Maintain CSS styles order.
require('./styles/style.css')

// Run the application.
require('./render').default().catch((error) => console.error(error))