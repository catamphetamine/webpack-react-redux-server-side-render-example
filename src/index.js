// Add ES6 polyfill (for older browsers).
require('babel-polyfill')

// Maintain CSS styles order.
require('./styles/style.css')

// Run the application.
require('./render').default().catch((error) => console.error(error))

/**
 * Suppress warnings from React Router caused by `react-hot-loader`.
 * The warning can be safely ignored, so filter it from the console.
 * Otherwise you'll see it every time something changes.
 * See https://github.com/gaearon/react-hot-loader/issues/298
 */
if (module.hot) {
  const consoleError = console.error
  console.error = (...args) => {
    if (args.length === 1 && typeof args[0] === 'string' && args[0].indexOf('You cannot change <Router routes>;') >= 0) {
      // React route changed
    } else {
      // Log the error as normally
      consoleError.apply(console, args)
    }
  }
}
