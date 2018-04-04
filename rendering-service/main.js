import webpageServer from 'react-website/server'
import { smokeScreen, hideSmokeScreenAfter } from 'universal-webpack'
import path from 'path'

import settings, { icon } from '../src/react-website'
import configuration from '../configuration'

export default function(parameters) {
  // Create webpage rendering server
  const server = webpageServer(settings, {
    // When using a proxy server
    // all HTTP requests to relative URLs
    // will be transformed to absolute URLs
    // using these settings.
    // Using a proxy server is considered outdated
    // and it is here for the simplest example purpose only.
    proxy: {
      host: 'localhost',
      port: configuration.webserver.port
      // For HTTPS
      // secure: true
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

    html: {
      // (optional)
      // Will be inserted into server rendered webpage <head/>.
      head(path) {
        if (process.env.NODE_ENV !== 'production') {
          // Removes the "flash of unstyled content" in development mode.
          return `
            <script>
              ${hideSmokeScreenAfter(100)}
            </script>
          `
        }
      },

      // (optional)
      // Javascriptless web browsers detection
      bodyStart(path) {
        return `
          ${process.env.NODE_ENV === 'production' ? '' : smokeScreen}
          <script>
            // This line is just for CSS
            document.body.classList.add('javascript-is-enabled');
          </script>
        `
      }
    },

    // One can set `hollow` flag to `true`
    // to turn off Server-Side React Rendering.
    // Server-Side React Rendering takes some CPU time
    // (about 30 milliseconds for a complex React page as of 2017).
    // Modern search engines know how to run javascript
    // so there shouldn't be any issues with indexing.
    // Turning off Server-Side Rendering delays the
    // "time-to-first-byte" though
    // (until the javascript bundle is fully downloaded).
    // Read `react-website` docs for more info.
    // hollow: true
  })

  // Start webpage rendering server
  server.listen(configuration.services.rendering.port, function(error) {
    if (error) {
      console.error('Webpage rendering service was shut down due to an error')
      throw error
    }

    console.log(`Webpage rendering service is listening on port ${configuration.services.rendering.port}`)
  })
}
