import superagent from 'superagent'

const http = {}

const http_method_functions =
{
	get    : 'get',
	post   : 'post',
	put    : 'put',
	patch  : 'patch',
	delete : 'del'
}

for (let http_method of Object.keys(http_method_functions))
{
	http[http_method] = function(url, data)
	{
		return new Promise((resolve, reject) =>
		{
			const request = superagent[http_method_functions[http_method]](url)

			if (data)
			{
				if (http_method === 'post')
				{
					request.send(data)
				}
				else
				{
					request.query(data)
				}
			}

			request.end((error, response) => 
			{
				if (error)
				{
					reject((response && response.body) || error)
				}
				else
				{
					resolve(response.body)
				}
			})
		})
	}
}

export default http