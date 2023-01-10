import startServer from 'universal-webpack/server'
import settings from '../webpack/universal-webpack-settings.json' assert { type: 'json' }
import configuration from '../webpack/webpack.config.js'

startServer(configuration, settings)
