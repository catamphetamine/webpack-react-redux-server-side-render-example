import webpack from 'webpack'
import ChunkManifestPlugin from 'chunk-manifest-webpack-plugin'
import WebpackChunkHash from 'webpack-chunk-hash'

export default function set_up_caching(configuration)
{
	// Specifies the name of each output entry file
	configuration.output.filename = '[name].[chunkhash].js',

	// Specifies the name of each (non-entry) chunk file
	configuration.output.chunkFilename = '[name].[chunkhash].js'

	configuration.plugins.push
	(
		// https://webpack.js.org/plugins/commons-chunk-plugin/
		new webpack.optimize.CommonsChunkPlugin
		({
			// The chunk name of the commons chunk.
			// An existing chunk can be selected by passing a name of an existing chunk.
			// If an array of strings is passed this is equal to
			// invoking the plugin multiple times for each chunk name.
			//
			// The runtime code
			// (the chunk manifest along with bootstrapping/runtime code)
			// is moved to the last common entry.
			//
			name: ['vendor', 'manifest'],

			// "The minimum number of chunks which need to contain
			//  a module before it's moved into the commons chunk.
			//  Passing `Infinity` just creates the commons chunk,
			//  but moves no modules into it."
			// Whatever that means, just copy-pasting from the "Caching" guide
			// https://webpack.js.org/guides/caching/
			minChunks: Infinity
		}),

		new webpack.HashedModuleIdsPlugin(),

		new WebpackChunkHash(),

		new ChunkManifestPlugin
		({
			filename         : 'chunk-manifest.json',
			manifestVariable : 'webpack_chunk_manifest'
		})
	)
}