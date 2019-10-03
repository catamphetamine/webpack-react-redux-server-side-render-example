// ES6 polyfill.
require('core-js/stable')
// `async/await` support.
require('regenerator-runtime/runtime')

// Maintain CSS styles order.
require('./styles/style.css')

// https://github.com/gaearon/react-hot-loader
// "Make sure `react-hot-loader` is required before `react` and `react-dom`".
require('react-hot-loader')

// Run the application.
require('./render').default().catch((error) => console.error(error))