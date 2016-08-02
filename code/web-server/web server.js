import path from 'path'

import web_service from 'web-service'

const web = web_service({ log })

// serve static files
web.files('/assets', path.join(Root_folder, 'build', 'assets'))

// if it's not a static file url:

// Proxy /api requests to API server
web.proxy('/api', `http://${configuration.api_server.http.host}:${configuration.api_server.http.port}`, { name: 'API service' })

// Proxy all the rest requests to Webpage rendering server
web.proxy(`http://${configuration.webpage_server.http.host}:${configuration.webpage_server.http.port}`, { name: 'Page rendering service' })

// поднять http сервер
web.listen(configuration.web_server.http.port).then(() =>
{
	log.info(`Web server is listening`)
	log.info(`Now go to http://${configuration.web_server.http.host}:${configuration.web_server.http.port}`)
},
error =>
{
	log.error(error)
})