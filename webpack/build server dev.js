// babel register may be removed later
require('babel-core/register')

const base_configuration = require('./webpack.config')
const application_configuration = require('../code/common/configuration')

const build_server = require('../code/react-isomorphic-render/webpack/build server')

const publicPath = 'http://' + application_configuration.development.webpack.development_server.host + ':' + application_configuration.development.webpack.development_server.port + base_configuration.output.publicPath
const webpage_rendering_server = './code/page-server/web server.js'

module.exports = build_server(base_configuration, { development: true, publicPath, webpage_rendering_server })