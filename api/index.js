import { run } from 'serverless-functions'

import setupConfig from '../configuration/setup/index.js'
import serverlessConfig from './serverless.json' assert { type: 'json' }

// https://ru.stackoverflow.com/questions/1281148/referenceerror-dirname-is-not-defined
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

run('dev', setupConfig.api.port, serverlessConfig, { cwd: __dirname }).then(() => {
	console.info(`API is listening at http://localhost:${setupConfig.api.port}`)
})