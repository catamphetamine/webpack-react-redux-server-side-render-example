import configuration from '../configuration'

export default {
	// Chrome won't allow querying `localhost` from `localhost`
	// so had to just proxy the `/api` path using `webpack-dev-server`.
	//
	// The Chrome error was:
	//
	// "Failed to load http://localhost:3003/example/users:
	//  Response to preflight request doesn't pass access control check:
	//  No 'Access-Control-Allow-Origin' header is present on the requested resource.
	//  Origin 'http://localhost:3000' is therefore not allowed access."
	//
	api: `${configuration.services.api.secure ? 'https' : 'http'}://${configuration.services.api.host || 'localhost'}:${configuration.services.api.port}`
}