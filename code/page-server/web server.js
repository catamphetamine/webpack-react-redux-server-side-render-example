import React from 'react'
import webpage_server from 'react-isomorphic-render/server'
import { devtools } from 'universal-webpack'

import common from '../client/react-isomorphic-render'
import Log from '../common/log'

const log = Log('webpage renderer')

export default function(parameters)
{
	// Starts webpage rendering server
	const server = webpage_server
	({
		// Http Urls to javascripts and (optionally) CSS styles 
		// which will be insterted into the <head/> element of the resulting Html webpage
		// (as <script src="..."/> and <link rel="style" href="..."/> respectively)
		//
		// Also a website "favicon".
		//
		assets: (url) =>
		{
			// Retrieve asset chunk file names
			// (which are output by client side Webpack build)
			const result = clone(parameters.chunks())

			// Webpack entry point (can be used for code splitting)
			result.entry = 'main'

			// Clear Webpack require() cache for hot reload in development mode
			// (this is not necessary)
			if (_development_)
			{
				delete require.cache[require.resolve('../../assets/images/icon/cat_64x64.png')]
			}

			// Add "favicon"
			result.icon = require('../../assets/images/icon/cat_64x64.png')

			// Return assets
			return result
		},

		// Http host and port for executing all client-side ajax requests on server-side
		application:
		{
			host: configuration.web_server.http.host,
			port: configuration.web_server.http.port
		},

		html:
		{
			// Will be inserted into server rendered webpage <head/>
			// (this `head()` function is optional and is not required)
			// (its gonna work with or without this `head()` parameter)
			head: (url) =>
			{
				if (_development_)
				{
					// `devtools` just tampers with CSS styles a bit.
					// It's not required for operation and can be omitted.
					const script = devtools({ ...parameters, entry: 'main' })
					return <script dangerouslySetInnerHTML={{ __html: script }}/>
				}
			}
		}
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