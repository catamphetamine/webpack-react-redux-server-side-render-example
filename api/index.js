import { run } from 'serverless-functions'

import configuration from '../configuration'
import serverlessConfig from './serverless'

run('dev', configuration.services.api.port, serverlessConfig, { cwd: __dirname }).then(() => {
	console.info(`API is listening at http://localhost:${configuration.services.api.port}`)
})