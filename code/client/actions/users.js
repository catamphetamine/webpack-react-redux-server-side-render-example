export function get()
{
	const action =
	{
		promise: http =>
		{
			return http.get('/api/example/users').then(ids =>
			{
				return Promise.map(ids, id =>
				{
					return http.get(`/api/example/users/${id}`)
				})
			})
		},
		events: ['retrieving users', 'users retrieved', 'users retrieval failed']
	}

	return action
}

export function add(info)
{
	// maybe add validation here

	const action =
	{
		promise: http => http.post(`/api/example/users`, info),
		events: ['adding user', 'user added', 'adding user failed']
	}

	return action
}

export function remove(id)
{
	const action =
	{
		promise: http => http.delete(`/api/example/users/${id}`),
		events: ['deleting user', 'user deleted', 'deleting user failed']
	}

	return action
}

export function dismiss_adding_error()
{
	return { type: 'adding error dismissed' }
}