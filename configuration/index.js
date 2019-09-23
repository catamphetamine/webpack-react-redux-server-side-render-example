const serverConfiguration = require('./server')

const configuration = getConfiguration(process.env.NODE_ENV)

// API service absolute URL.
//
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
// https://stackoverflow.com/a/10892392/970769
//
configuration.api = `${serverConfiguration.api.secure ? 'https' : 'http'}://${serverConfiguration.api.host || 'localhost'}:${serverConfiguration.api.port}`

module.exports = configuration

function getConfiguration(env) {
	switch (env) {
		case 'production':
			return require('./configuration.production')
		default:
			return require('./configuration.development')
	}
}