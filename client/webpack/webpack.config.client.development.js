import webpack from 'webpack'
import base_configuration from './webpack.config.client'
import application_configuration from '../../configuration'

const configuration = base_configuration({ development: true, css_bundle: true })

// configuration.devtool = 'inline-eval-cheap-source-map'

configuration.plugins.push
(
	// environment variables
	new webpack.DefinePlugin
	({
		'process.env':
		{
			NODE_ENV  : JSON.stringify('development'),
			BABEL_ENV : JSON.stringify('development/client')
		},
		REDUX_DEVTOOLS : false  // enable/disable redux-devtools
	}),

	// faster code reload on changes
	new webpack.HotModuleReplacementPlugin(),

	// prints more readable module names in the browser console on HMR updates
	new webpack.NamedModulesPlugin(),

	// // extracts common javascript into a separate file (works)
	// new webpack.optimize.CommonsChunkPlugin('common', 'common.[hash].js')
)

// enable webpack development server
configuration.entry.main =
[
	`webpack-hot-middleware/client?path=http://${application_configuration.webpack.devserver.host}:${application_configuration.webpack.devserver.port}/__webpack_hmr`,
	'react-hot-loader/patch',
	configuration.entry.main
]

// network path for static files: fetch all statics from webpack development server
configuration.output.publicPath = `http://${application_configuration.webpack.devserver.host}:${application_configuration.webpack.devserver.port}${configuration.output.publicPath}`

export default configuration
