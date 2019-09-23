import webpageServer from 'react-pages/server'
import path from 'path'

import settings, { icon } from '../src/react-pages'
import setupConfig from '../configuration/setup'

export default function(parameters) {
  // Create webpage rendering server
  const server = webpageServer(settings, {
    // Proxy all HTTP requests for data
    // through a proxy server to the API server.
    // Wouldn't do such a thing in a real-world app
    // and would just query the API server directly
    // but Chrome won't allow that for `localhost`.
    proxy: {
      host: setupConfig.api.host || 'localhost',
      port: setupConfig.api.port,
      // For HTTPS
      secure: setupConfig.api.secure
    },

    // HTTP URLs for javascripts and (optionally) CSS styles
    // which will be insterted into the `<head/>` element
    // of the resulting HTML webpage as `<script src="..."/>`
    // and `<link rel="style" href="..."/>`.
    //
    // And also the URL for website "favicon".
    //
    assets: (path) => ({
      // Javascripts and (optionally) styles for the `entries`.
      // They are output by client-side Webpack build.
      // E.g.:
      // {
      //   javascript: {
      //     main: '/assets/main.js'
      //   },
      //   // (optional)
      //   styles: {
      //     main: '/assets/main.css'
      //   }
      // }
      ...parameters.chunks(),

      // Website "favicon"
      icon
    }),

    // One can set `renderContent` flag to `false`
    // to turn off Server-Side React Rendering.
    // It only disables page rendering,
    // i.e. the inside of the `<div id="react"/>` DOM element
    // while everything around it is still
    // rendered on server side (e.g. `<head/>`).
    // Server-Side React Rendering takes some CPU time
    // (about 30 milliseconds for a complex React page as of 2017).
    // Modern search engines know how to run javascript
    // so there shouldn't be any issues with indexing.
    // Turning off Server-Side Rendering delays the
    // "time-to-first-byte" though
    // (until the javascript bundle is fully downloaded).
    // Read `react-pages` docs for more info.
    // renderContent: false
  })

  // Start webpage rendering server
  server.listen(setupConfig.pageServer.port, function(error) {
    if (error) {
      console.error('Webpage rendering service was shut down due to an error')
      throw error
    }
    console.log(`Webpage rendering service is listening on port ${setupConfig.pageServer.port}`)
  })
}
