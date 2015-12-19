import fs from 'fs'

/* export */ const load = json => JSON.parse(fs.readFileSync(json, 'utf8'))
// global.load = load

api.get('/utility/settings', function()
{
	const public_fields =
	[
		'putin'
		// 'webserver.http.host'
		// 'webserver.http.port'
	]

	const settings = {}

	for (let path of public_fields)
	{
		Object.set_value_at_path(settings, path, Object.get_value_at_path(configuration, path))
	}

	settings.version = load(`${Root_folder}/package.json`).version

	return settings
})

api.get('/utility/ping', function()
{
	return true
})