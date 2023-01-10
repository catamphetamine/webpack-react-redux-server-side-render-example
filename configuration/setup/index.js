// import { merge } from 'lodash-es'
import merge from 'lodash/merge.js'

import defaultConfiguration from './configuration.default.json' assert { type: 'json' }
import productionConfiguration from './configuration.production.json' assert { type: 'json' }
import developmentConfiguration from './configuration.development.json' assert { type: 'json' }

const configuration = merge({}, defaultConfiguration)

export default configuration

merge(configuration, getConfiguration(process.env.NODE_ENV))

// For services like Amazon Elastic Compute Cloud and Heroku
if (process.env.PORT) {
	configuration.webserver.port = process.env.PORT
}

// For passing custom configuration via an environment variable.
// For frameworks like Docker.
// E.g. `CONFIGURATION="{ \"key\": \"value\" }" npm start`.
if (process.env.CONFIGURATION) {
	try {
		merge(configuration, JSON.parse(process.env.CONFIGURATION))
	} catch (error) {
		console.error(error)
	}
}

function getConfiguration(env) {
	switch (env) {
		case 'production':
			return productionConfiguration
		default:
			return developmentConfiguration
	}
}