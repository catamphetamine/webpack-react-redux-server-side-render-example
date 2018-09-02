import application_configuration from '../configuration'

const devserver = application_configuration.webpack.devserver

// Modifies webpack configuration to get all files
// from webpack development server.
export function setDevFileServer(configuration)
{
	return {
		...configuration,
		output:
		{
			...configuration.output,
			publicPath: `http://${devserver.host}:${devserver.port}${configuration.output.publicPath}`
		}
	}
}