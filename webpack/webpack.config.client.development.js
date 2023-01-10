import webpack from 'webpack'

import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'

import { clientConfiguration } from 'universal-webpack'
import settings from './universal-webpack-settings.json' assert { type: 'json' }
import baseConfiguration from './webpack.config.js'

import { devServerConfig, setDevFileServer } from './devserver.js'

let configuration = clientConfiguration(baseConfiguration, settings)

// `webpack-serve` can't set the correct `mode` by itself
// so setting `mode` to `"development"` explicitly.
// https://github.com/webpack-contrib/webpack-serve/issues/94
configuration.mode = 'development'

// Only when using `webpack-dev-server`.
if (process.env.SERVE) {
	configuration.plugins.push(new ReactRefreshWebpackPlugin())
}

// Fetch all files from webpack development server.
configuration = setDevFileServer(configuration)

// Run `webpack serve`.
configuration.devServer = devServerConfig

// Prints more readable module names in the browser console on HMR updates.
configuration.optimization = {
	...configuration.optimization,
	moduleIds: 'named'
}

export default configuration