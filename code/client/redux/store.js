import create_store from '../../react-isomorphic-render/redux/store'

import create_routes from '../routes'

export default function(data, { development, development_tools, server, http_request })
{
	const options =
	{
		development       : development,
		development_tools : development_tools,

		get_reducers() { return require('../model') },

		// // Somehow fix Redux reducer module hot reloading here.
		// // I suppose this should be a relative path 
		// // from 'react-isomorphic-render/redux/store' to that 'model/index.js' file.
		// // https://github.com/webpack/webpack/issues/1790
		// reducers_path: '../../client/model',

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

	const { store, reload } = create_store(options)

	// client side hot module reload for Redux reducers
	// (should be moved to react-isomoprhic-render/redux/store.js)
	if (development && module.hot)
	{
		module.hot.accept('../model', () =>
		{
			reload()
		})
	}

	return store
}