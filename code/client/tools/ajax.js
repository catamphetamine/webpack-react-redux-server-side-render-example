import Promise from 'bluebird'

export default function ajax(url, data, options)
{
	const resolver = Promise.pending()

	const request = new XMLHttpRequest()

	// request.withCredentials = yes

	let method = 'get'
	if (options && options.method) 
	{
		method = options.method
	}

	if (data && method == 'get')
	{	
		let first = true

		for (let key of Object.keys(data))
		{
			if (first)
			{
				url += '?'
				first = false
			}
			else
			{
				url += '&'
			}

			url += encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
		}
	}

	request.open(method.toUpperCase(), url, true)

	request.onload = function(event)
	{
		if (this.status != 200)
		{
			return resolver.reject(this.status)
		}

		let response = this.responseText

		if (this.getResponseHeader("Content-Type").starts_with('application/json'))
		{
			response = JSON.parse(response)
		}

		resolver.resolve(response)
	}

	request.onerror = function(error)
	{
		resolver.reject(error)
	}

	request.ontimeout = function()
	{
		resolver.reject('timeout')
	}

	request.onabort = function()
	{
		resolver.reject('abort')
	}

	if (data && method == 'post')
	{
		const parameters = JSON.stringify(data)

		request.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
		// request.setRequestHeader("Content-length", parameters.length)
		request.send(parameters)
	}
	else
	{
		request.send()
	}

	return resolver.promise
}

for (let method of ['get', 'post', 'head'])
{
	ajax[method] = (url, data, options) =>
	{
		options = options || {}
		options.method = method
		return ajax(url, data, options)
	}
}
