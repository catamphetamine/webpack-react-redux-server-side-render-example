import configuration from './webpack.config.server.production.babel'
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
