// This is the "public" configuration of the app.
// It's embedded in the bundle so don't put any secret keys here.

const setupConfiguration = require('./setup')

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
configuration.api = `${setupConfiguration.api.secure ? 'https' : 'http'}://${setupConfiguration.api.host || 'localhost'}:${setupConfiguration.api.port}`

module.exports = configuration

function getConfiguration(env) {
	switch (env) {
		case 'production':
			return require('./configuration.production')
		default:
			return require('./configuration.development')
	}
}