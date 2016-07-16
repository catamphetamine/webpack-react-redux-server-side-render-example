// This is an example of a simple REST Api implementation.
//
// For debugging you can use "Advanced REST Client" for Google Chrome:
// https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo

import { errors } from 'web-service'

const users = new Map()
let id_counter = 0

export default function(api)
{
	api.get('/example/users', function()
	{
		return Array.from(users.keys())
	})

	api.get('/example/users/:id', function({ id })
	{
		if (!users.has(id))
		{
			throw new errors.Not_found(`User ${id} not found`)
		}
		
		return { ...users.get(id), id: id }
	})

	api.post('/example/users', function({ name })
	{
		if (!exists(name))
		{
			throw new errors.Input_missing(`"name" not specified`)
		}

		id_counter++
		const id = String(id_counter)

		users.set(id, { name: name })

		return id
	})

	api.patch('/example/users/:id', function({ id, name })
	{
		// throw new Error(123)

		if (!users.has(id))
		{
			throw new errors.Not_found(`User ${id} not found`)
		}

		users.get(id).name = name
	})

	api.delete('/example/users/:id', function({ id })
	{
		// throw new Error(123)

		if (!users.has(id))
		{
			throw new errors.Not_found(`User ${id} not found`)
		}
		
		users.delete(id)
	})

	api.post('/example/users/:id/picture', function({ id, file_name })
	{
		// testing uploading image spinner
		// return new Promise((resolve) => setTimeout(resolve, 3000))

		// throw new Error(123)

		if (!users.has(id))
		{
			throw new errors.Not_found(`User ${id} not found`)
		}

		users.get(id).picture = file_name
	})
}