import { cloneDeep } from 'lodash';
import webpack from 'webpack';
import baseConfiguration from './webpack.config.server';

const WEBPACK_DEV_SERVER_PORT = 3001

const configuration = cloneDeep(baseConfiguration)

// Network path for static files: fetch all statics from webpack development server
configuration.output.publicPath = `http://localhost:${WEBPACK_DEV_SERVER_PORT}${configuration.output.publicPath}`

export default configuration
