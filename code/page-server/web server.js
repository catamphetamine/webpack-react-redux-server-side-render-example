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
		// head: () => [...]

		// extra <body/> content
		// (optional)
		// body: () => ...

		// this CSS will be inserted into server rendered webpage <head/> <style/> tag 
		// (when in development mode only - removes rendering flicker)
		style: () =>
		{
			// clear require() cache for hot reload in development mode
			if (_development_)
			{
				delete require.cache[require.resolve('../../assets/styles/style.scss')]
			}

			// The `.source[0][1]` in the end is caused by `fake-style-loader`.
			// https://github.com/dferber90/fake-style-loader/issues/1
			return require('../../assets/styles/style.scss').source[0][1]
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