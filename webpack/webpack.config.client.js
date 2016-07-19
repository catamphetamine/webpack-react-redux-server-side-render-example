import { client_configuration } from 'universal-webpack'
import settings from './universal-webpack-settings'
import configuration from './webpack.config'

export default function(options)
{
	return client_configuration(configuration, settings, options)
}