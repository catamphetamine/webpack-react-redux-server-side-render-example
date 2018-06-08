import application_configuration from '../configuration'

const devserver = application_configuration.webpack.devserver

// Adds `webpack-serve` settings to webpack configuration.
export function addDevServerConfiguration(configuration)
{
	return {
		...configuration,
		serve:
		{
			port : devserver.port,
			dev  :
			{
				// https://github.com/webpack-contrib/webpack-serve/issues/95
				publicPath : configuration.output.publicPath,
				headers : { 'Access-Control-Allow-Origin': '*' }
			}
		}
	}
}

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