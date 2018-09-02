import applicationConfiguration from './configuration'

const devserver = applicationConfiguration.webpack.devserver

// Adds `webpack-serve` settings to webpack configuration.
export default
{
	port : devserver.port,
	devMiddleware :
	{
		// https://github.com/webpack-contrib/webpack-serve/issues/95
		publicPath : `http://${devserver.host}:${devserver.port}/assets`, // ${configuration.output.publicPath}
		headers : { 'Access-Control-Allow-Origin': '*' }
	}
}