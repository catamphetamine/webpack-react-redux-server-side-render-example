import path from 'path'
import webservice from 'web-service'

import setupConfig from '../configuration/setup'

const webserver = webservice({})

// Serve static files
webserver.files('/assets', path.join(__dirname, '../build/assets'))

// if it's not a static file url:

// Proxy `/api` requests to API server.
// Wouldn't do it in a real-world app
// and would just query the API directly
// but Chrome won't allow that for `localhost`.
webserver.proxy('/api', `http://localhost:${setupConfig.api.port}`, { name: 'API service' })

// Proxy all the rest requests to Webpage rendering server.
webserver.proxy(`http://localhost:${setupConfig.pageServer.port}`, { name: 'Page rendering service' })

// Start web server
webserver.listen(setupConfig.webserver.port).then(() =>
{
	console.info(`Web server is listening`)
	console.info(`Now go to http://localhost:${setupConfig.webserver.port}`)
},
(error) =>
{
	console.error(error)
})
