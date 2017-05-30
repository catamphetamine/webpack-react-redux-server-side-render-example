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

// Set `bluebird` as the default `Promise` implementation
// inside 3rd party libraries using `babel-runtime`.
require('babel-runtime/core-js/promise').default = require('bluebird')