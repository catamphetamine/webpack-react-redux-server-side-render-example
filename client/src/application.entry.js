// use bluebird for Promises
require('babel-runtime/core-js/promise').default = require('bluebird')

var bluebird_options = {
  // Enable cancellation
  cancellation: true
}

if (process.env.NODE_ENV !== 'production') {
  // Enable warnings
  bluebird_options.warnings = true
  // Enable long stack traces
  bluebird_options.longStackTraces = true
  // Enable monitoring
  bluebird_options.monitoring = true
}

require('bluebird').config(bluebird_options)

/**
 * Warning from React Router, caused by react-hot-loader.
 * The warning can be safely ignored, so filter it from the console.
 * Otherwise you'll see it every time something changes.
 * See https://github.com/gaearon/react-hot-loader/issues/298
 */
if (module.hot) {
  const isString = a => typeof a === 'string'
  const orgError = console.error // eslint-disable-line no-console
  console.error = (...args) => { // eslint-disable-line no-console
    if (args && args.length === 1 && isString(args[0]) && args[0].indexOf('You cannot change <Router routes>;') > -1) {
      // React route changed
    } else {
      // Log the error as normally
      orgError.apply(console, args)
    }
  }
}

require('./application')
