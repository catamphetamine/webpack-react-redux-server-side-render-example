import { client_configuration } from 'universal-webpack'
import settings from './universal-webpack-settings'
import configuration from './webpack.config'

export default function({ development })
{
	return client_configuration(configuration, settings, { development })
}