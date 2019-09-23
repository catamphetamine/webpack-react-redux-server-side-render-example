import applicationConfiguration from '../configuration/server'

const devserver = applicationConfiguration.webpackDevServer

// `webpack-dev-server` settings.
export const devServerConfig =
{
	// The port to serve assets on.
	port : devserver.port,

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
	proxy: [{
		context: (path) => {
			return path !== '/api' && path.indexOf('/api/') !== 0
		},
		target: `http://localhost:${applicationConfiguration.pageServer.port}`
	}, {
		context: '/api',
		target: `${applicationConfiguration.api.secure ? 'https' : 'http'}://${applicationConfiguration.api.host || 'localhost'}:${applicationConfiguration.api.port}`,
		pathRewrite: { '^/api' : '' }
  }],

 	// This is just for forcing `webpack-dev-server`
 	// to not disable proxying for root path (`/`).
  index: '',

	// Uncomment if using `index.html` instead of Server-Side Rendering.
	// https://webpack.js.org/configuration/dev-server/#devserver-historyapifallback
	// historyApiFallback : true
}

// Modifies webpack configuration to get all files
// from webpack development server.
export function setDevFileServer(configuration)
{
	return {
		...configuration,
		output:
		{
			...configuration.output,
			publicPath: `http://localhost:${devserver.port}${configuration.output.publicPath}`
		}
	}
}