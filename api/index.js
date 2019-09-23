import { run } from 'serverless-functions'

import setupConfig from '../configuration/setup'
import serverlessConfig from './serverless'

run('dev', setupConfig.api.port, serverlessConfig, { cwd: __dirname }).then(() => {
	console.info(`API is listening at http://localhost:${setupConfig.api.port}`)
})