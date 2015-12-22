import { clone } from '../helpers'
import path     from 'path'

import webpack from 'webpack'

function generate(base_configuration, options = {})
{
	const { development, development_tools, publicPath, webpage_rendering_server } = options

	const configuration = clone(base_configuration)

	// const output_path = path.resolve(configuration.output.path, '../server')

	// https://webpack.github.io/docs/configuration.html#devtool
	configuration.devtool = 'source-map'
	// configuration.devtool = 'inline-source-map'
	// configuration.devtool = 'eval-source-map'
	// configuration.devtool = 'eval-cheap-module-source-map'

	configuration.target = 'node'

	configuration.entry = { webpage_rendering_server: webpage_rendering_server }

	configuration.output.libraryTarget = 'commonjs2'

	// configuration.output.path = output_path

	if (publicPath)
	{
		configuration.output.publicPath = publicPath
	}

	// no need for browser cache management, so disable hashes in filenames
	configuration.output.filename = '[name].js'
	configuration.output.chunkFilename = '[name].js'

	// Include comments with information about the modules.
	// require(/* ./test */23).
	// What for is it here? I don't know. It's a copy & paste from the Webpack author's code.
	configuration.output.pathinfo = true

	// What for is it here? I don't know. It's a copy & paste from the Webpack author's code.
	configuration.resolveLoader =
	{
		root  : path.join(configuration.context, 'node_modules'),
		alias : 
		{
			"react-proxy$"        : "react-proxy/unavailable",
			"react-proxy-loader$" : "react-proxy-loader/unavailable"
		}
	}

	// `externals` allows you to specify dependencies for your library 
	// that are not resolved by webpack, but become dependencies of the output. 
	// This means they are imported from the environment during runtime.
	//
	// So that Webpack doesn't bundle "node_modules" into main.js.
	configuration.externals = [/^[a-z\/\-0-9]+$/i]

	const webpack_assets_path = path.resolve(configuration.output.path, 'webpack-assets.json')
	// const webpack_assets_path = path.resolve(output_path, 'webpack-assets.json')

	configuration.plugins = configuration.plugins.concat
	(
		// environment variables
		new webpack.DefinePlugin
		({
			'process.env':
			{
				// Useful to reduce the size of client-side libraries, e.g. react
				NODE_ENV: JSON.stringify(development ? 'development' : 'production') // 'development' to see non-minified React errors
			},

			_client_            : false,
			_server_            : true,

			_development_       : development,
			_production_        : !development,

			_development_tools_ : development_tools, // enable/disable Redux dev-tools

			_webpack_assets_path_: JSON.stringify(webpack_assets_path)
		}),

		// // PrefetchPlugin is said to prefetch the specified ".js" files in the background.
		// // What for is it here? I don't know. It's a copy & paste from the Webpack author's code.
		// new webpack.PrefetchPlugin("react"),
		// new webpack.PrefetchPlugin("react/lib/ReactComponentBrowserEnvironment"),

		// omit duplicate modules
		new webpack.optimize.DedupePlugin(),

		// Assign the module and chunk ids by occurrence count. 
		// Ids that are used often get lower (shorter) ids. 
		// This make ids predictable, reduces to total file size and is recommended.
		new webpack.optimize.OccurenceOrderPlugin(),

		// put the resulting Webpack compiled code into a sigle javascript file
		new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })
	)

	// find the styles loader
	const scss_loader = configuration.module.loaders.filter(loader =>
	{
		return loader.test.toString() === configuration.regular_expressions.styles.toString()
	})
	.first()

	// remove 'style-loader' from the list of loaders
	scss_loader.loaders.shift()

	// // What for is it here? I don't know. It's a copy & paste from the Webpack author's code.
	// scss_loader.loaders[0] = scss_loader.loaders[0].replace(/^css-loader/, 'css-loader/locals')

	// // What for is it here? I don't know. It's a copy & paste from the Webpack author's code.
	// devServer:
	// {
	// 	stats:
	// 	{
	// 		cached: false,
	// 		exclude: exclude_from_stats
	// 	}
	// }

	return configuration
}

export default generate