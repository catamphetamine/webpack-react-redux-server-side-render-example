// Base Webpack configuration.
//
// Not using ES6 syntax here because this file
// is not processed with Babel on server side.
// See `./rendering-service/index.js` for more info.

const path = require('path')
const webpack = require('webpack')

const project_folder = path.resolve(__dirname, '..')

module.exports =
{
	// Resolve all relative paths from the project root folder
	context: project_folder,

	output:
	{
		// Filesystem path for static files
		path: path.resolve(project_folder, 'build/assets'),

		// Network path for static files
		publicPath: '/assets/',

		// Specifies the name of each output entry file
		filename: '[name].[hash].js',

		// Specifies the name of each (non-entry) chunk file
		chunkFilename: '[name].[hash].js'
	},

	module:
	{
		rules:
		[{
			test: /\.js$/,
			exclude: /node_modules/,
			use:
			[{
				loader: 'babel-loader'
			}]
		},
		{
			test: /\.(css)$/,
			use:
			[{
				loader: 'style-loader'
			},
			{
				loader : 'css-loader',
				options:
				{
					// The query parameter `importLoaders` allows to configure how many
					// loaders before css-loader should be applied to @imported resources.
					// `1` - `postcss-loader`.
					importLoaders : 1,
					sourceMap     : true
				}
			},
			{
				loader : 'postcss-loader'
			}]
		},
		{
			test: /\.(jpg|png)$/,
			use:
			[{
				loader : 'url-loader',
				options:
				{
					// Any png-image or woff-font below or equal to 5K
					// will be converted to inline base64 instead.
					limit: 5120
				}
			}]
		},
		{
			test: /\.(svg)$/,
			use:
			[{
				loader: 'svg-react-loader'
			}]
		}]
	},

	// Hides "Entrypoint size exeeds the recommened limit (250kB)" warnings.
	// https://github.com/webpack/webpack/issues/3486
	performance:
	{
		hints: false
	},

	// Plugins will be added to this array by extending configurations.
	plugins: []
}