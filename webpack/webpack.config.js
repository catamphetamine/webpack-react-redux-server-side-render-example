// Base Webpack configuration.
//
// Not using ES6 syntax here because this file
// is not processed with Babel on server side.
// See `./rendering-service/index.js` for more info.

import path from 'path'
import webpack from 'webpack'

import configuration from '../configuration/index.js'
import setupConfiguration from '../configuration/setup/index.js'

// https://ru.stackoverflow.com/questions/1281148/referenceerror-dirname-is-not-defined
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT_DIRECTORY = path.resolve(__dirname, '..')

export default {
	// Resolve all relative paths from the project root folder
	context: ROOT_DIRECTORY,

	output: {
		// Filesystem path for static files
		path: path.resolve(ROOT_DIRECTORY, 'build/assets'),

		// Network path for static files
		publicPath: setupConfiguration.publicPath + '/',

		// Specifies the name of each output entry file
		filename: '[name].[fullhash].js',

		// Specifies the name of each (non-entry) chunk file
		chunkFilename: '[name].[fullhash].js'
	},

	module: {
		rules:
		[{
			test: /\.js$/,
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader'
			}]
		},
		{
			test: /\.(css)$/,
			use: [{
				loader: 'style-loader'
			}, {
				loader : 'css-loader',
				options:
				{
					// The query parameter `importLoaders` allows to configure how many
					// loaders before css-loader should be applied to @imported resources.
					// `1` - `postcss-loader`.
					importLoaders : 1,
					sourceMap     : true
				}
			}, {
				loader: 'postcss-loader',
				options: {
					sourceMap: true
				}
			}]
		},
		{
			test: /\.(jpg|png)$/,
			use: [{
				loader : 'url-loader',
				options: {
					// Any png-image or woff-font below or equal to 5K
					// will be converted to inline base64 instead.
					limit: 5120
				}
			}]
		},
		{
			test: /\.(svg)$/,
			use: [{
				loader: 'svg-react-loader'
			}]
		}]
	},

	// Hides "Entrypoint size exeeds the recommened limit (250kB)" warnings.
	// https://github.com/webpack/webpack/issues/3486
	performance: {
		hints: false
	},

	// Plugins will be added to this array by extending configurations.
	plugins: [
		// There have been cases when `ProvidePlugin` didn't see
		// `process.env` variables for some reason.
		// Using `DefinePlugin` instead to work around that.
		// new webpack.ProvidePlugin({
		//   configuration: path.resolve(ROOT_DIRECTORY, 'configuration'),
		//   // For ES6:
		//   // configuration: [path.resolve(ROOT_DIRECTORY, 'configuration'), 'default']
		// })
		new webpack.DefinePlugin({
			configuration: JSON.stringify(configuration)
		})
	]
}