import path from 'path'
import fs from 'fs'

function Plugin()
{
	this.stats_to_json_options = 
	{
		// Add built modules information to chunk information.
		// What for is it here? I don't know. It's a copy & paste from the Webpack author's code.
		chunkModules: true,

		// The following modules will be excluded from Webpack stats Json file.
		// What for is it here? I don't know. It's a copy & paste from the Webpack author's code.
		exclude:
		[
			/node_modules[\\\/]react(-router)?[\\\/]/,
			/node_modules[\\\/]items-store[\\\/]/
		]
	}
}

Plugin.prototype.apply = function(compiler)
{
	const output_path = path.resolve(compiler.options.output.path, 'webpack-assets.json')

	compiler.plugin('emit', function(compilation, done)
	{
		// notify stats
		notify_stats(compilation.getStats())

		// write stats
		// compilation.assets[output_path] =
		// {
		// 	size()
		// 	{
		// 		return 0
		// 	},
		// 	source()
		// 	{
		// 		return JSON.stringify(assets(compilation.getStats().toJson(this.stats_to_json_options), compiler.options.output.publicPath))
		// 	}
		// }

		fs.writeFileSync(output_path, JSON.stringify(assets(compilation.getStats().toJson(this.stats_to_json_options), compiler.options.output.publicPath)))

		// fs.outputFileSync(path.resolve(this.options.output.path, 'webpack-stats.json'), JSON.stringify(stats.toJson(options)))

		done()
	})
}

function assets(json, public_path)
{
	const assets_by_chunk = json.assetsByChunkName

	const assets =
	{
		javascript: {},
		styles: {}
	}

	// gets asset paths by name and extension of their chunk
	function get_assets(name, extension)
	{
		let chunk = json.assetsByChunkName[name]
	
		// a chunk could be a string or an array, so make sure it is an array
		if (!(Array.isArray(chunk)))
		{
			chunk = [chunk]
		}
	
		return chunk
			// filter by extension
			.filter(name => path.extname(name) === `.${extension}`)
			// adjust the real path (can be http, filesystem)
			.map(name => public_path + name)
	}

	// for each chunk name ("main", "common", ...)
	Object.keys(assets_by_chunk).forEach(function(name)
	{
		// log.debug(`getting javascript and styles for chunk "${name}"`)

		// get javascript chunk real file path

		const javascript = get_assets(name, 'js')[0]
		// the second asset is usually a source map

		if (javascript)
		{
			// log.debug(` (got javascript)`)
			assets.javascript[name] = javascript
		}

		// get style chunk real file path

		const style = get_assets(name, 'css')[0]
		// the second asset is usually a source map

		if (style)
		{
			// log.debug(` (got style)`)
			assets.styles[name] = style
		}
	})

	return assets
}

// outputs webpack stats to console if there are no errors or warnings

function error(error)
{
	// BELLs when something goes wrong!
	console.log("\x07" + error)
}

function warning(warning)
{
	console.log(warning)
}

function notify_stats(stats)
{
	const json = stats.toJson()
	
	// if there were any errors
	if (json.errors.length > 0)
	{
		return json.errors.forEach(error)
	}

	// if there were any warnings
	if (json.warnings.length > 0)
	{
		json.warnings.forEach(warning)
	}

	// if it's ok
	console.log(stats.toString
	({
		chunks: false,
		colors: true
	}))
}

module.exports = Plugin