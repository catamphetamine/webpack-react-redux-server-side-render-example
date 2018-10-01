import webpack from 'webpack'

import { clientConfiguration } from 'universal-webpack'
import settings from './universal-webpack-settings'
import baseConfiguration from './webpack.config'

import { devServerConfig, setDevFileServer } from './devserver'

let configuration = clientConfiguration(baseConfiguration, settings)

// `webpack-serve` can't set the correct `mode` by itself
// so setting `mode` to `"development"` explicitly.
// https://github.com/webpack-contrib/webpack-serve/issues/94
configuration.mode = 'development'

// Fetch all files from webpack development server.
configuration = setDevFileServer(configuration)

// Run `webpack-dev-server`.
configuration.devServer = devServerConfig

configuration.plugins.push
(
	// Prints more readable module names in the browser console on HMR updates.
	new webpack.NamedModulesPlugin()
)

export default configuration