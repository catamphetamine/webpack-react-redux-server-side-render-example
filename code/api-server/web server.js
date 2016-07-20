import { api } from 'web-service'

import path from 'path'
import fs   from 'fs'

const api_service = api
({
	name : 'Example API service',
	api  : [require('./api/example')],
	log
})

api_service.listen(configuration.api_server.http.port).then(() =>
{
	log.info(`Api server is listening at http://${configuration.api_server.http.host}:${configuration.api_server.http.port}`)
},
error =>
{
	log.error(error)
})