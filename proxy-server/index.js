import path from 'path'
import webservice from 'web-service'

import configuration from '../configuration'

const webserver = webservice({})

// Serve static files
webserver.files('/assets', path.join(__dirname, '../build/assets'))

// if it's not a static file url:

// Proxy /api requests to API server
webserver.proxy('/api', `http://localhost:${configuration.services.api.port}`, { name: 'API service' })

// Proxy all the rest requests to Webpage rendering server
webserver.proxy(`http://localhost:${configuration.services.rendering.port}`, { name: 'Page rendering service' })

// Start web server
webserver.listen(configuration.webserver.port).then(() =>
{
	console.info(`Web server is listening`)
	console.info(`Now go to http://localhost:${configuration.webserver.port}`)
},
(error) =>
{
	console.error(error)
})
