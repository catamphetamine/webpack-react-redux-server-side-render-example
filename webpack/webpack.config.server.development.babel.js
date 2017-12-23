import cloneDeep from 'lodash/cloneDeep'

import configuration from './webpack.config.server'
import settings from '../configuration'

export default
{
	...configuration,
	output:
	{
		...configuration.output,
		// Get all statics from webpack development server
		publicPath: `http://${settings.webpack.devserver.host}:${settings.webpack.devserver.port}${configuration.output.publicPath}`
	}
}
