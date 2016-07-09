import koa          from 'koa'
import session      from 'koa-session'
import body_parser  from 'koa-bodyparser'
import mount        from 'koa-mount'
import koa_router   from 'koa-router'
import koa_logger   from 'koa-bunyan'
import compress     from 'koa-compress'
import statics      from 'koa-static'
import http_proxy   from 'http-proxy'

import path from 'path'
import fs   from 'fs-extra'

import http  from 'http'
import https from 'https'

// Sets up a Web Server instance (based on Koa)
//
// options:
//
// compress            - tar/gz response data
//
// session             - tracks user session
//
// parse_post_requests - parse Http Post requests body
//
// routing             - enables Rest Http routing
//                       (usage: web.get('/path', parameters => return 'Echo'))
//
// log                 - bunyan log instance
//
// returns an object with properties:
//
//   errors        - a set of common Http errors
//
//     Unauthorized
//     Access_denied
//     Not_found
//     Input_missing
//
//   serve_static_files() - enables serving static files
//
//     parameters:
//
//       url_path        - the URL path to mount this middleware at
//
//       filesystem_path - the corresponding filesystem path where the static files reside
//
//   listen()             - starts listening for requests
//
//     parameters:
//
//       port - the TCP port to listen on
//       host - the TCP host to listen on (defaults to 0.0.0.0)
//
//     returns: a Promise
//
//   mount()             - mounts a middleware at a path
//
//     parameters:
//
//       path       - the URL path to mount the middleware at
//       middleware - the middleware to mount
//
//   use()               - standard Koa .use() method
//
//   proxy()             - proxies all requests for this path to another web server
//
//     parameters:
//
//       path        - the URL path to mount the requests for
//       destination - where to proxy these requests to
//
export default function web_server(options = {})
{
	// this object will be returned
	const result = {}

	// instantiate a Koa web application
	const web = koa()

	if (options.compress)
	{
		// хз, нужно ли сжатие в node.js: мб лучше поставить впереди nginx'ы, 
		// и ими сжимать, чтобы не нагружать процесс node.js
		web.use(compress())
	}

	// Can output incoming HTTP requests to `log`
	if (options.log)
	{
		web.use(koa_logger(log,
		{
			// which level you want to use for logging.
			// default is info
			level: 'debug',
			// this is optional. Here you can provide request time in ms,
			// and all requests longer than specified time will have level 'warn'
			timeLimit: 100
		}))
	}

	// Set up session middleware
	web.keys = configuration.session_secret_keys

	if (options.session)
	{
		web.use(session(web))
	}

	// `body_parser` should not be enabled for file upload (with `co-busboy`)
	if (options.parse_post_requests)
	{
		// Set up http post request handling.
		// Usage: this.request.body
		web.use(body_parser({ formLimit: '100mb' }))
	}

	if (options.routing)
	{
		const router = koa_router()

		// REST routing
		//
		// usage: web.get('/path', parameters => 'Echo')
		for (let method of ['get', 'put', 'patch', 'post', 'delete'])
		{
			result[method] = function(path, action)
			{
				router[method](path, function*(next)
				{
					const result = action({ ...this.request.body, ...this.query, ...this.params })

					if (result instanceof Promise)
					{
						yield result.then(result =>
						{
							this.body = result
						},
						error =>
						{
							throw error
						})
					}
					else
					{
						this.body = result
					}
				})
			}
		}

		web.use(router.routes()).use(router.allowedMethods())
	}

	// handle errors
	web.use(function*(next)
	{
		try
		{
			yield next
		}
		catch (error)
		{
			// log the error
			log.error(error)

			this.status = typeof error.code === 'number' ? error.code : 500
			this.message = error.message || 'Internal error'
		}
	})

	// standard Http errors
	result.errors = 
	{
		Unauthorized  : custom_error('Unauthorized',  { code: 403 }),
		Access_denied : custom_error('Access denied', { code: 403 }),
		Not_found     : custom_error('Not found',     { code: 404 }),
		Input_missing : custom_error('Missing input', { code: 400 })
	}

	// can serve static files
	result.serve_static_files = function(url_path, filesystem_path)
	{
		// https://github.com/koajs/static
		web.use(mount(url_path, statics(filesystem_path, 
		{
			maxAge  : 365 * 24 * 60 * 60 // 1 year
		})))
	}

	// Runs the HTTP server
	result.listen = (port, host = '0.0.0.0') =>
	{
		return new Promise((resolve, reject) =>
		{
			// the last route - throws not found error
			web.use(function*()
			{
				// throw new Method_not_found()
				this.status = 404
				this.message = `The requested resource not found: ${this.method} ${this.url}`
				
				// Reduces noise in the `log` in case of errors
				// (browsers query '/favicon.ico' automatically)
				if (this.path !== '/favicon.ico')
				{
					log.error(this.message)
				}
			})

			// http server
			const http_web_server = http.createServer()

			// // enable Koa for handling http requests
			// http_web_server.on('request', web.callback())

			// copy-pasted from 
			// https://github.com/koajs/koala/blob/master/lib/app.js
			//
			// "Expect: 100-continue" is something related to http request body parsing
			// http://crypto.pp.ua/2011/02/mexanizm-expectcontinue/
			//
			const koa_callback = web.callback()
			http_web_server.on('request', koa_callback)
			http_web_server.on('checkContinue', function(request, response)
			{
				// requests with `Expect: 100-continue`
				request.checkContinue = true
				koa_callback(request, response)
			})

			http_web_server.listen(port, host, error =>
			{
				if (error)
				{
					return reject(error)
				}

				resolve()
			})
		})
	}

	// mounts middleware at path
	result.mount = (path, handler) =>
	{
		web.use(mount(path, handler))
	}

	// exposes Koa .use() function for custom middleware
	result.use = web.use.bind(web)

	// can proxy http requests
	result.proxy = (from, to) =>
	{
		if (!exists(to))
		{
			to = from
			from = undefined
		}

		const proxy = http_proxy.createProxyServer({})

		function proxy_middleware(to)
		{
			return function*()
			{
				const promise = new Promise((resolve, reject) =>
				{
					this.res.on('close', () =>
					{
						reject(new Error(`Http response closed while proxying ${this.url} to ${to}`))
					})

					this.res.on('finish', () =>
					{
						resolve()
					})

					// proxy.webAsync() won't work here,
					// because the last parameter is not a "callback",
					// it's just an error handler.
					// https://github.com/nodejitsu/node-http-proxy/issues/951
					proxy.web(this.req, this.res, { target: to }, error =>
					{
						// usually errors with "Parse error" which is useless

						// error.proxy_error = true
						// error.proxy_to = to

						console.error('Proxying failed')
						reject(error)

						// response.writeHead(502)
						// response.end("There was an error proxying your request")
					})
				})

				yield promise
			}
		}

		if (from)
		{
			web.use(mount(from, proxy_middleware(to)))
		}
		else
		{
			web.use(proxy_middleware(to))
		}
	}

	// done
	return result
}