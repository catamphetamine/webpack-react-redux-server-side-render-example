// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License
//
// takes a string
// returns an object { protocol, host, port, path, query, anchor, ... }
function parse_uri(uri = document.location)
{
	const options =
	{
		strictMode: false,
		key:
		[
			"source",   // protocol:
			"protocol",
			"authority", // //user:password@
			"userInfo", // user:password
			"user",
			"password",
			"host",
			"port",
			"relative", 
			"path",
			"directory",
			"file",
			"query",
			"anchor"
		],
		query:
		{
			name:   "parameters",
			parser: /(?:^|&)([^&=]*)=?([^&]*)/g
		},
		parser:
		{
			//            protocol  :     //      user        :password    @  host          :port      path (relative,directory,file) ? query       #anchor
			strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
			loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
		}
	}
		
	var matches = options.parser[options.strictMode ? "strict" : "loose"].exec(uri)
	
	const result = {}

	let i = 14
	while (i--)
	{
		result[options.key[i]] = matches[i] || ""
	}

	result[options.query.name] = {}

	// options.key[12] === "query"
	result[options.key[12]].replace(options.query.parser, function ($0, $1, $2)
	{
		if ($1)
		{
			result[options.query.name][$1] = $2
		}
	})

	return result
}

export default class Uri
{
	constructor(uri)
	{
		var parsed = parse_uri(uri)

		for (let key of Object.keys(parsed))
		{
			this[key] = parsed[key]
		}

		// this.protocol = this.protocol || 'http'
		this.path = decodeURI(this.path)
		
		for (let key of Object.keys(this.parameters))
		{
			const decoded_key = decodeURIComponent(key)
			const decoded_value = decodeURIComponent(this.parameters[key])

			this.parameters[decoded_key] = decoded_value

			if (decoded_key !== key)
			{
				delete this.parameters[key]
			}

			if (!exists(this[key]))
			{
				this[key] = decoded_value
			}
		}
	}

	to_relative_url()
	{
		this.protocol = ''
		this.host = ''
		this.port = ''
		
		return this.print()
	}
	
	no_parameters()
	{
		this.parameters = {}
		
		return this
	}
	
	parameter(parameter, value)
	{
		this.parameters[parameter] = value

		return this
	}
	
	remove_parameter(parameter)
	{
		delete this.parameters[parameter]

		return this
	}
	
	print(options)
	{
		options = extend({ machine: true }, options)

		let uri = ''
	
		if (this.protocol)
		{
			let omit_protocol = false
			
			if (options.omit_common_protocols)
			{
				if (this.protocol === 'http' || this.protocol === 'https')
				{
					omit_protocol = true
				}
			}
			
			if (!omit_protocol)
			{
				uri += this.protocol + '://'
			}
		}
	
		if (this.host)
		{
			uri += this.host + (this.port ? ':' + this.port : '')
		}
			
		uri += this.path //encodeURI(this.path)

		let first_parameter = true
		for (let key of Object.keys(this.parameters))
		{
			uri += first_parameter ? '?' : '&'
			uri += options.machine ? encodeURIComponent(key) : key
			uri += '='
			uri += options.machine ? encodeURIComponent(this.parameters[key]) : this.parameters[key]
			
			first_parameter = false
		}

		if (this.anchor)
		{
			uri += '#'
			uri += options.machine ? encodeURIComponent(this.anchor) : this.anchor
		}

		return uri
	}
}

// testing
;(function()
{
	function assert(left, right)
	{
		if (left !== right)
		{
			throw new Error(`Assertion failed: got "${left}", expected "${right}"`)
		}
	}
	
	assert(new Uri('http://гугл.рф?раз=два#три').print(), 'http://гугл.рф?%D1%80%D0%B0%D0%B7=%D0%B4%D0%B2%D0%B0#%D1%82%D1%80%D0%B8')
	assert(new Uri('http://гугл.рф?раз=два#три').print({ machine: false }), 'http://гугл.рф?раз=два#три')
	assert(new Uri('google.ru').print(), 'google.ru')

	assert(parse_uri('http://google.ru/root/path/test?parameters').path, '/root/path/test')
})()