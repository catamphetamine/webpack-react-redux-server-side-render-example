import { api } from 'web-service'

import example_api from './api/example'

const API_SERVICE_PORT = 3003

const apiService = api
({
	name : 'Example API service',
	api  : [example_api]
})

apiService.listen(API_SERVICE_PORT).then(() =>
{
	console.info(`Api server is listening at http://localhost:${API_SERVICE_PORT}`)
},
(error) =>
{
	console.error(error)
})