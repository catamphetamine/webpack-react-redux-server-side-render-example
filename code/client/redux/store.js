import store from '../../react-isomorphic-render/redux/store'

import create_routes from '../routes'

export default function(data, { development, development_tools, server, http_request })
{
	const options =
	{
		development       : development,
		development_tools : development_tools,

		get_reducers() { return require('../model') },

		// Somehow fix Redux reducer module hot reloading here.
		// I suppose this should be a relative path 
		// from 'react-isomorphic-render/redux/store' to that 'model.js' file
		reducers_path: '../../client/model',

		data,
		create_routes
	}

	if (server)
	{
		options.server = true

		// authentication cookie will be copied from this Http request
		options.http_request = http_request

		// Http host and port for data fetching when `preload`ing pages on the server
		options.host = configuration.web_server.http.host
		options.port = configuration.web_server.http.port
	}

	return store(options)
}