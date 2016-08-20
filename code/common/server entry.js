'use strict'

// use bluebird for Promises
require('babel-runtime/core-js/promise').default = require('bluebird')

var minimist = require('minimist')
var path = require('path')

global.Root_folder = path.resolve(__dirname, '..', '..')

var command_line_arguments = minimist(process.argv.slice(2))

global._production_ = command_line_arguments.production
global._development_ = command_line_arguments.development || process.env.NODE_ENV === 'development'

require('babel-register')
({
	// Exclude `node_modules` anywhere in the path,
	// and also the `[project-root]/build` folder
	// (which is where `universal-webpack` outputs server-side bundle).
	// 
	// Babel excludes all `node_modules` by default,
	// so by overriding the default behavior it must be duplicated.
	// https://github.com/babel/babel/blob/c8bd9e3ffb23e216d92fb70188fcf105381b8bb8/packages/babel-register/src/node.js#L90-L96
	//
	// Excluding the `build` folder is said to speed up things a bit.
	// https://github.com/halt-hammerzeit/webpack-react-redux-isomorphic-render-example/issues/5
	//
	ignore: function(filename)
	{
		const relative_path = path.relative(global.Root_folder, filename)
		let folder = path.dirname(relative_path)

		// If it's a `node_modules` folder, ignore it
		if (folder.split(path.sep).indexOf('node_modules') >= 0)
		{
			return true
		}

		const slash_index = folder.indexOf(path.sep)
		if (slash_index >= 0)
		{
			folder = folder.substring(0, slash_index)
		}
		
		if (folder === 'build')
		{
			return true
		}

		return false
	}
})

require('./language')

require('bluebird').promisifyAll(require('fs-extra'))

global.configuration = require('./configuration')
// console.log('Configuration:', configuration)
