import React from 'react'

import create_store   from '../client/redux/store'
import create_routes  from '../client/routes'
import markup_wrapper from '../client/markup wrapper'

import webpage_server from 'react-isomorphic-render/page-server'

import log from '../common/log'

export default function(parameters)
{
	// starts webpage rendering server
	webpage_server
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

		// on which Http host and port to start the webpage rendering server
		// host: optional
		port: configuration.webpage_server.http.port,

		// Http host and port for executing all client-side ajax requests on server-side
		web_server:
		{
			host: configuration.web_server.http.host,
			port: configuration.web_server.http.port
		},

		// your custom bunyan log, if any (will default to `console` if none)
		log: log('webpage renderer'),
		
		// a function to create Redux store
		create_store,

		// creates React-router routes
		create_routes,
		
		// wraps React page component into arbitrary markup (e.g. Redux Provider)
		markup_wrapper,

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
	})
}