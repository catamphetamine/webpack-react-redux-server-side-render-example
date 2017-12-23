import { api } from 'web-service'

import example_api from './api/example'
import configuration from '../configuration'

const apiService = api
({
	name : 'Example API service',
	api  : [example_api]
})

apiService.listen(configuration.services.api.port).then(() =>
{
	console.info(`Api server is listening at http://localhost:${configuration.services.api.port}`)
},
(error) =>
{
	console.error(error)
})