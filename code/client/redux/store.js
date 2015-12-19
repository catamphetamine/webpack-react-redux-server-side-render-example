import store from '../../react-isomorphic-render/redux/store'

import routes from '../routes'

export default function(data, http_request)
{
	return store
	({
		get_reducers() { return require('../model') },
		reducers_path: '../model', // <-- somehow fix Redux reducer module hot reloading here
		data,
		routes,
		http_request, // will use all the cookies from it, etc
		host: _server_ ? configuration.web_server.http.host : undefined,
		port: _server_ ? configuration.web_server.http.port : undefined
	})
}