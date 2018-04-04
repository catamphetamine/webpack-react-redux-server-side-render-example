// Base Webpack configuration.
//
// Not using ES6 syntax here because this file
// is not processed with Babel on server side.
// See `./rendering-service/index.js` for more info.

var path = require('path')
var webpack = require('webpack')

var project_folder = path.resolve(__dirname, '..')

module.exports =
{
	// Resolve all relative paths from the project root folder
	context: project_folder,

	// Each "entry" can be divided into multiple chunks.
	// Why multiple "entries" might be used?
	// For example, for completely different website parts,
	// like the public user-facing part and the private "admin" part.
	entry:
	{
		// The "main" entry
		main:
		[
			'babel-polyfill',
			'./src/index.entry.js'
		]
	},

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
		// Works around Webpack bug when using `Array.from()` in Babel (`core-js`)
		// https://github.com/webpack/webpack/issues/5135
		strictThisContextOnImports: true,

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
			test: /\.(scss)$/,
			use:
			[{
				loader: 'style-loader'
			},
			{
				loader : 'css-loader',
				options:
				{
					importLoaders : 2,
					sourceMap     : true
				}
			},
			{
				loader : 'postcss-loader',
				options:
				{
					sourceMap : true
				}
			},
			{
				loader : 'sass-loader',
				options:
				{
					outputStyle       : 'expanded',
					sourceMap         : true,
					sourceMapContents : true
				}
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
					importLoaders : 2,
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
					// Any png-image or woff-font below or equal to 10K
					// will be converted to inline base64 instead.
					limit: 10240
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

	plugins: []
}