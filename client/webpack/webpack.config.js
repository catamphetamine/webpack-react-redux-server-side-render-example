// This is the base Webpack configuration file

var path = require('path')
var webpack = require('webpack')

// project folder
var root_folder = path.resolve(__dirname, '..')

var configuration =
{
	// Resolve all relative paths from the project root folder
	context: root_folder,

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
			'./src/application.entry.js'
		]
	},

	output:
	{
		// Filesystem path for static files
		path: path.resolve(root_folder, 'build/assets'),

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
					limit: 10240 // Any png-image or woff-font below or equal to 10K will be converted to inline base64 instead
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

	plugins: []
}

module.exports = configuration
