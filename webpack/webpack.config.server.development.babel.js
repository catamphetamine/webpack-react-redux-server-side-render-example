import language from '../code/common/language'

import webpack            from 'webpack'
import base_configuration from './webpack.config.server'

import application_configuration from '../code/common/configuration'

const configuration = Object.clone(base_configuration)

// Network path for static files: fetch all statics from webpack development server
configuration.output.publicPath = `http://${application_configuration.development.webpack.development_server.host}:${application_configuration.development.webpack.development_server.port}${configuration.output.publicPath}`

export default configuration