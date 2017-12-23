import cloneDeep from 'lodash/cloneDeep'
import webpack from 'webpack'

import base_configuration from './webpack.config.server'
import application_configuration from '../configuration'

const configuration = cloneDeep(base_configuration)

// Network path for static files: fetch all statics from webpack development server
configuration.output.publicPath = `http://${application_configuration.webpack.devserver.host}:${application_configuration.webpack.devserver.port}${configuration.output.publicPath}`

export default configuration
