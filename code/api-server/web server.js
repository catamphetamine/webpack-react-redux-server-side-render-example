import web_server from '../common/web server'

import path from 'path'
import fs   from 'fs'

const web = web_server({ compress: true, session: true, parse_post_requests: true, routing: true })

global.api = {}

for (let method of ['get', 'put', 'patch', 'post', 'delete'])
{
	global.api[method] = web[method]
}

for (let file of fs.readdirSync(path.join(__dirname, 'api')))
{
	log.info('loading api module', file)
	require(path.join(__dirname, 'api', file))
}

global.Errors = web.errors

web.listen(configuration.api_server.http.port).then(() =>
{
	log.info(`Api server is listening at http://${configuration.api_server.http.host}:${configuration.api_server.http.port}`)
},
error =>
{
	log.error(error)
})