import path from 'path'
import webservice from 'web-service'

import configuration from '../configuration'

const web = webservice({})

// Serve static files
web.files('/assets', path.join(__dirname, '../client/build/assets'))

// if it's not a static file url:

// Proxy /api requests to API server
web.proxy('/api', `http://localhost:${configuration.services.api.port}`, { name: 'API service' })

// Proxy all the rest requests to Webpage rendering server
web.proxy(`http://localhost:${configuration.services.rendering.port}`, { name: 'Page rendering service' })

// Start web server
web.listen(configuration.web.port).then(() =>
{
	log.info(`Web server is listening`)
	log.info(`Now go to http://localhost:${configuration.web.port}`)
},
(error) =>
{
	console.error(error)
})