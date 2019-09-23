import { run } from 'serverless-functions'

import configuration from '../configuration/server'
import serverlessConfig from './serverless'

run('dev', configuration.api.port, serverlessConfig, { cwd: __dirname }).then(() => {
	console.info(`API is listening at http://localhost:${configuration.api.port}`)
})