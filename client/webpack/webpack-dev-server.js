import express from 'express';
import webpack from 'webpack';
import configuration from './webpack.config.client.development';

const WEBPACK_DEV_SERVER_PORT = 3001

// http://webpack.github.io/docs/webpack-dev-server.html
const developmentServerOptions = {
  quiet       : true, // don’t output anything to the console
  noInfo      : true, // suppress boring information
  hot         : true, // adds the HotModuleReplacementPlugin and switch the server to hot mode. Note: make sure you don’t add HotModuleReplacementPlugin twice
  inline      : true, // also adds the webpack/hot/dev-server entry

  // You can use it in two modes:
  // watch mode (default): The compiler recompiles on file change.
  // lazy mode: The compiler compiles on every request to the entry point.
  lazy        : false,

  // network path for static files: fetch all statics from webpack development server
  publicPath  : configuration.output.publicPath,

  headers     : { 'Access-Control-Allow-Origin': '*' },
  stats       : { colors: true }
};

const compiler = webpack(configuration);

const developmentServer = new express();

developmentServer.use(require('webpack-dev-middleware')(compiler, developmentServerOptions));
developmentServer.use(require('webpack-hot-middleware')(compiler));

developmentServer.listen(WEBPACK_DEV_SERVER_PORT, (error) => {
  if (error) {
    console.error(error.stack || error);
    throw error;
  }

  console.log('[webpack-dev-server] Running');
});
