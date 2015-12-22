import language from '../code/common/language'

import express from 'express'

import path from 'path'

import webpack                         from 'webpack'
import base_configuration              from './webpack.config'

import react_isomorphic_render_plugin from '../code/react-isomorphic-render/webpack/plugin'

import application_configuration from '../code/common/configuration'

const configuration = Object.clone(base_configuration)

// const server_output_path = path.resolve(configuration.output.path, '../server')

configuration.devtool = 'inline-source-map'

configuration.plugins = configuration.plugins.concat
(
	// environment variables
	new webpack.DefinePlugin
	({
		'process.env':
		{
			NODE_ENV: JSON.stringify('development'),
			BABEL_ENV: JSON.stringify('development/client')
		},

		_client_            : true,
		_server_            : false,
		_production_        : false,
		_development_       : true,
		_development_tools_ : false  // enable/disable redux-devtools
	}),

	// faster code reload on changes
	new webpack.HotModuleReplacementPlugin(),

	// // extracts common javascript into a separate file (works)
	// new webpack.optimize.CommonsChunkPlugin('common', 'common.[hash].js'),

	new react_isomorphic_render_plugin()
)

// enable webpack development server
configuration.entry.main = 
[
	`webpack-hot-middleware/client?path=http://${application_configuration.development.webpack.development_server.host}:${application_configuration.development.webpack.development_server.port}/__webpack_hmr`,
	configuration.entry.main
]

// network path for static files: fetch all statics from webpack development server
configuration.output.publicPath = `http://${application_configuration.development.webpack.development_server.host}:${application_configuration.development.webpack.development_server.port}${configuration.output.publicPath}`

// add react-hot-loader to react components' loaders
const javascript_loader = configuration.module.loaders.filter(loader =>
{
	return loader.test.toString() === configuration.regular_expressions.javascript.toString()
})
.first()

javascript_loader.query = javascript_loader.query || {}

javascript_loader.query.plugins = javascript_loader.query.plugins || []
javascript_loader.query.plugins.push('react-transform')

extend(javascript_loader.query,
{
	extra:
	{
		'react-transform':
		{
			transforms:
			[{
				transform : 'react-transform-hmr',
				imports   : ['react'],
				locals    : ['module']
			},
			{
				"transform": "react-transform-catch-errors",
				
				"imports":
				[
					// the first import is your React distribution
					// (if you use React Native, pass "react-native" instead)

					"react",

					// the second import is the React component to render error
					// (it can be a local path too, like "./src/ErrorReporter")

					"redbox-react",

					// the third import is OPTIONAL!
					// when specified, its export is used as options to the reporter.
					// see specific reporter's docs for the options it needs.

					// "./src/reporterOptions"
				]
			}]
		}
	}
})

// http://webpack.github.io/docs/webpack-dev-server.html
const development_server_options = 
{
	quiet       : true, // don’t output anything to the console
	noInfo      : true, // suppress boring information
	hot         : true, // adds the HotModuleReplacementPlugin and switch the server to hot mode. Note: make sure you don’t add HotModuleReplacementPlugin twice
	inline      : true, // also adds the webpack/hot/dev-server entry

	// You can use it in two modes:
	// watch mode (default): The compiler recompiles on file change.
	// lazy mode: The compiler compiles on every request to the entry point.
	lazy        : false, 

	// network path for static files: fetch all statics from webpack development server
	publicPath  : configuration.output.publicPath,

	headers     : { "Access-Control-Allow-Origin": "*" },
	stats       : { colors: true }
}

const compiler = webpack(configuration)

const development_server = new express()

development_server.use(require('webpack-dev-middleware')(compiler, development_server_options))
development_server.use(require('webpack-hot-middleware')(compiler))

development_server.listen(application_configuration.development.webpack.development_server.port, (error) =>
{
	if (error) 
	{
		console.error(error.stack || error)
		throw error
	}

	console.log('[webpack-dev-server] Running')
})