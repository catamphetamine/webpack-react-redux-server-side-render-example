module.exports = 
{
	api_server:
	{
		http: 
		{
			host: '127.0.0.1',
			port: 3002
		}
	},
	webpage_server: 
	{
		http: 
		{
			host: '127.0.0.1',
			port: 3003
		}
	},
	web_server: 
	{
		http: 
		{
			host: '127.0.0.1',
			port: 3000
		}
	},
	session_secret_keys: ['stackenblochen'],
	development:
	{
		webpack:
		{
			development_server:
			{
				host: '127.0.0.1',
				port: 3001
			}
		}
	}
}