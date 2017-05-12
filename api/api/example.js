// This is an example of a simple REST Api implementation.
//
// For debugging you can use "Advanced REST Client" for Google Chrome:
// https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo

import { errors } from 'web-service'

const users = new Map()
let id_counter = 0

export default function(api)
{
	api.get('/example/users', async () =>
	{
		return Array.from(users.keys())
	})

	api.get('/example/users/:id', async ({ id }) =>
	{
		if (!users.has(id))
		{
			throw new errors.Not_found(`User ${id} not found`)
		}
		
		return { ...users.get(id), id: id }
	})

	api.post('/example/users', async ({ name }) =>
	{
		if (!name)
		{
			throw new errors.Input_rejected(`"name" is required`)
		}

		id_counter++
		const id = String(id_counter)

		users.set(id, { name: name })

		return id
	})

	api.patch('/example/users/:id', async ({ id, name }) =>
	{
		if (!users.has(id))
		{
			throw new errors.Not_found(`User ${id} not found`)
		}

		users.get(id).name = name
	})

	api.delete('/example/users/:id', async ({ id }) =>
	{
		if (!users.has(id))
		{
			throw new errors.Not_found(`User ${id} not found`)
		}
		
		users.delete(id)
	})

	api.post('/example/users/:id/picture', async ({ id, file_name }) =>
	{
		if (!users.has(id))
		{
			throw new errors.Not_found(`User ${id} not found`)
		}

		users.get(id).picture = file_name
	})
}