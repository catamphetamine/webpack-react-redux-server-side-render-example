// this babel register call is used when require()ing configuration
require('babel-core/register')

// base Webpack configuration
const base_configuration = require('./webpack.config')

// application configuration properties
const application_configuration = require('../code/common/configuration')

// server-side Webpack build configuration generator
const build_server = require('react-isomorphic-render/webpack').build_server

// the URL at which the assets reside
const publicPath = 'http://' + application_configuration.development.webpack.development_server.host + ':' + application_configuration.development.webpack.development_server.port + base_configuration.output.publicPath

// this file will be the entry point which is gonna be compiled into `webpage_rendering_server.js`
const webpage_rendering_server = './code/page-server/web server.js'

// returns Webpack configuration for server-side build
module.exports = build_server(base_configuration, { development: true, development_tools: false, publicPath, webpage_rendering_server })