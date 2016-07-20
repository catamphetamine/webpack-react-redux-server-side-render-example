import React from 'react'
import webpage_server from 'react-isomorphic-render/page-server'
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

		// Will be inserted into server rendered webpage <head/>
		// (this `head()` function is optional and is not required)
		// (its gonna work with or without this `head()` parameter)
		head: () =>
		{
			if (_development_)
			{
				// `devtools` just tampers with CSS styles a bit.
				// It's not required for operation and can be omitted.
				return <script dangerouslySetInnerHTML={{ __html: devtools }}/>
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