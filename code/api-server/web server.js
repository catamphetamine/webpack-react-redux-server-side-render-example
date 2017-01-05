import { api } from 'web-service'

import example_api from './api/example'

export default function()
{
	const api_service = api
	({
		name : 'Example API service',
		api  : [example_api],
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
}