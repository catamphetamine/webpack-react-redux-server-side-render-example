import React from 'react'

import create_store   from '../client/redux/store'
import markup_wrapper from '../client/markup wrapper'

import webpage_server from 'react-isomorphic-render/page-server'
import { assets } from 'react-isomorphic-render/webpack'

import log from '../common/log'

export default function()
{
	// starts webpage rendering server
	webpage_server
	({
		// enable/disable development mode
		development: _development_,

		// enable/disable Redux dev-tools
		development_tools: _development_tools_,

		// path to `webpack-assets.json` (which is output by client side Webpack build)
		assets: assets(_webpack_assets_path_, _development_),

		// on which Http host and port to start the webpage rendering server
		// host: optional
		port: configuration.webpage_server.http.port,

		// your custom bunyan log, if any (will default to `console` if none)
		log: log('webpage renderer'),
		
		// a function to create Redux store
		create_store,
		
		// wraps React page component into arbitrary markup (e.g. Redux Provider)
		markup_wrapper,

		// will be inserted into server rendered webpage <head/>
		// (use `key`s to prevent React warning)
		head: () =>
		{
			// clear require() cache for hot reload in development mode
			if (_development_)
			{
				delete require.cache[require.resolve('../../assets/images/icon/cat_64x64.png')]
			}

			return 
			[
				<link rel="shortcut icon" href={require('../../assets/images/icon/cat_64x64.png')} key="1"/>
			]
		},

		// this CSS will be inserted into server rendered webpage <head/> <style/> tag 
		// (when in development mode only - removes rendering flicker)
		styles: () =>
		{
			// clear require() cache for hot reload in development mode
			if (_development_)
			{
				delete require.cache[require.resolve('../../assets/styles/style.scss')]
			}

			return require('../../assets/styles/style.scss').toString()
		}
	})
}