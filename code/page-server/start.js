import 'source-map-support/register'

import { server } from 'universal-webpack'
import settings from '../../webpack/universal-webpack-settings'
import configuration from '../../webpack/webpack.config'

server(configuration, settings)