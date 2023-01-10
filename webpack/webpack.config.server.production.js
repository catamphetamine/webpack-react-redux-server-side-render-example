import { serverConfiguration } from 'universal-webpack'
import settings from './universal-webpack-settings.json' assert { type: 'json' }
import baseConfiguration from './webpack.config.js'

export default serverConfiguration(baseConfiguration, settings)