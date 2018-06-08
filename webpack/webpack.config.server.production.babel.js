import { serverConfiguration } from 'universal-webpack'
import settings from './universal-webpack-settings'
import baseConfiguration from './webpack.config'

export default serverConfiguration(baseConfiguration, settings)