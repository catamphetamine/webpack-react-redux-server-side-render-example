import path from 'path'
import webservice from 'web-service'

const WEB_SERVICE_PORT = 3000
const PAGE_SERVICE_PORT = 3002
const API_SERVICE_PORT = 3003

const web = webservice({})

// Serve static files
web.files('/assets', path.join(__dirname, '../client/build/assets'))

// if it's not a static file url:

// Proxy /api requests to API server
web.proxy('/api', `http://localhost:${API_SERVICE_PORT}`, { name: 'API service' })

// Proxy all the rest requests to Webpage rendering server
web.proxy(`http://localhost:${PAGE_SERVICE_PORT}`, { name: 'Page rendering service' })

// Start web server
web.listen(WEB_SERVICE_PORT).then(() =>
{
	log.info(`Web server is listening`)
	log.info(`Now go to http://localhost:${WEB_SERVICE_PORT}`)
},
(error) =>
{
	console.error(error)
})