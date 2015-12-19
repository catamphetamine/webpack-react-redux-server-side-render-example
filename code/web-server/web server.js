import path          from 'path'

import web_server from '../common/web server'

const web = web_server()

// serve static files
web.serve_static_files('/assets', path.join(Root_folder, 'build', 'assets'))

// if it's not a static file url:

// Proxy /api requests to API server
web.proxy('/api', `http://${configuration.api_server.http.host}:${configuration.api_server.http.port}`)

// Proxy all the rest requests to Webpage rendering server
web.proxy(`http://${configuration.webpage_server.http.host}:${configuration.webpage_server.http.port}`)

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