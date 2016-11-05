// This is the base Webpack configuration file

var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')

// project folder
var root_folder = path.resolve(__dirname, '..')

// where all the (source) assets reside
var assets_source_folder = path.resolve(root_folder, 'assets')

var configuration =
{
	// resolve all relative paths from the project root folder
	context: root_folder,

	// https://webpack.github.io/docs/multiple-entry-points.html
	entry:
	{
		main: './code/client/application.entry.js'
	},

	output: 
	{
		// filesystem path for static files
		path: path.resolve(root_folder, 'build/assets'),

		// network path for static files
		publicPath: '/assets/',

		// file name pattern for entry scripts
		filename: '[name].[hash].js',

		// file name pattern for chunk scripts
		chunkFilename: '[name].[hash].js'
	},

	module:
	{
		loaders: 
		[
			{
				test   : /\.json$/,
				loader : 'json-loader'
			},
			{
				test    : /\.js$/,
				// include: [path.resolve(root_folder, 'code')],
				// exclude: path.resolve(root_folder, 'node_modules'),
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test    : /\.scss$/,
				loaders : 
				[
					'style-loader',
					'css-loader?importLoaders=2&sourceMap',
					'postcss-loader',
					'sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true'
				]
			},
			{
				test    : /\.(jpg|png)$/,
				loaders : 
				[
					'url-loader?limit=10000' // Any png-image or woff-font below or equal to 10K will be converted to inline base64 instead
				]
			}
		]
	},

	postcss: () => [autoprefixer({ browsers: 'last 2 version' })],

	plugins: []
}

module.exports = configuration