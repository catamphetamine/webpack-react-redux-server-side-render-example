import React from 'react'
import webpage_server from 'react-isomorphic-render/page-server'
import common from '../client/react-isomorphic-render'

import Log from '../common/log'

const log = Log('webpage renderer')

export default function(parameters)
{
	// starts webpage rendering server
	const server = webpage_server
	({
		// enable/disable development mode
		development: _development_,

		// Http Urls to javascripts and (optionally) CSS styles 
		// which will be insterted into the <head/> element of the resulting Html webpage
		// (as <script src="..."/> and <link rel="style" href="..."/> respectively)
		//
		// Also a website "favicon".
		//
		assets: () =>
		{
			// retrieves asset chunk file names
			// (which is output by client side Webpack build)
			const result = clone(parameters.chunks())

			// Webpack entry point (code splitting)
			result.entry = 'main'

			// clear Webpack require() cache for hot reload in development mode
			if (_development_)
			{
				delete require.cache[require.resolve('../../assets/images/icon/cat_64x64.png')]
			}

			// add "favicon"
			result.icon = require('../../assets/images/icon/cat_64x64.png')

			// return assets
			return result
		},

		// Http host and port for executing all client-side ajax requests on server-side
		application:
		{
			host: configuration.web_server.http.host,
			port: configuration.web_server.http.port
		},

		// will be inserted into server rendered webpage <head/>
		// (use `key`s to prevent React warning)
		// (optional)
		head: () =>
		{
			// (in development mode)
			//
			// Removing the now unnecessary `<link rel="stylesheet"/>` tag,
			// because the client-side javascript has already kicked-in
			// and added all the styles using `style-loader` dynamically.
			//
			// Should that stylesheet be removed at all?
			// Not necessarily.
			// It's just, for example, if a developer opens the page,
			// then decides to remove some CSS class,
			// and switches back to the browser,
			// and the CSS class is still there,
			// because it was only removed from dynamically added CSS styles,
			// not the statically added ones on the server-side.
			//
			if (_development_)
			{
				const script =
				`
					document.addEventListener('DOMContentLoaded', function(event)
					{
						const stylesheets = document.querySelectorAll('head link[rel="stylesheet"]')

						if (stylesheets.length > 1)
						{
							// Waits a "magic" time amount of 2 seconds
							// for the dynamically added stylesheets
							// to be parsed and applied to the page.
							setTimeout(function()
							{
								stylesheets[0].parentNode.removeChild(stylesheets[0])
							},
							2000)
						}
						else
						{
							console.log("Couldn't remove server-rendered stylesheet tag because the dynamically added stylesheets haven't yet been added")
						}
					})
				`

				return <script dangerouslySetInnerHTML={{ __html: script }}/>
			}
		}

		// extra <body/> content
		// (optional)
		// body: () => ...
	},
	common)

	// Start webpage rendering server
	server.listen(configuration.webpage_server.http.port, function(error)
	{
		if (error)
		{
			log.error('Webpage rendering server shutdown due to an error', error)
			throw error
		}

		log.info(`Webpage server is listening at http://localhost:${configuration.webpage_server.http.port}`)
	})
}