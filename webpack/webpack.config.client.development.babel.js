import webpack from 'webpack'
import application_configuration from '../configuration'

import { clientConfiguration } from 'universal-webpack'
import settings from './universal-webpack-settings'
import base_configuration from './webpack.config'

// With `development: false` all CSS will be extracted into a file
// named '[name]-[contenthash].css' using `mini-css-extract-plugin`.
const configuration = clientConfiguration(base_configuration, settings, { development: true })

// https://github.com/webpack-contrib/webpack-serve/issues/81#issuecomment-378469110
// export default const configuration = ...
module.exports = configuration

// https://webpack.js.org/guides/development/#source-maps
// The default `source-map` `devtool` gives better
// source maps in Chrome (as per user reports in 2017).
// configuration.devtool = 'cheap-eval-source-map'

// `webpack-serve` can't set the correct `mode` by itself.
// https://github.com/webpack-contrib/webpack-serve/issues/94
configuration.mode = 'development'

configuration.plugins.push
(
	// Environment variables
	new webpack.DefinePlugin
	({
		REDUX_DEVTOOLS : false  // enable/disable redux-devtools
	}),

	// // Webpack Hot Reload
	// new webpack.HotModuleReplacementPlugin(),

	// Prints more readable module names in the browser console on HMR updates
	new webpack.NamedModulesPlugin()
)

// network path for static files: fetch all statics from webpack development server
configuration.output.publicPath = `http://${application_configuration.webpack.devserver.host}:${application_configuration.webpack.devserver.port}${configuration.output.publicPath}`

// `webpack-serve` settings.
configuration.serve =
{
	port : application_configuration.webpack.devserver.port,
	dev  :
	{
		// https://github.com/webpack-contrib/webpack-serve/issues/95
		publicPath : configuration.output.publicPath,
		headers : { 'Access-Control-Allow-Origin': '*' }
	}
}
