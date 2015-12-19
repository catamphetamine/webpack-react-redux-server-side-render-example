import fs from 'fs'
import path from 'path'

import koa from 'koa'

import render from './render'

global._server_ = true
global._client_ = false

export default function start_web_server({ host, port, log, disable_server_side_rendering, server_side_rendering_path, create_store, routes, markup_wrapper, head, body, styles })
{
	log = log || console

	const web = koa()

	// handle errors

	function* errors(next)
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
	}

	web.use(errors)

	// isomorphic rendering

	function* rendering()
	{
		// these parameters are for Koa app.
		// they can be modified to work with Express app if needed.
		yield render
		({
			request : this.request, 
			respond : ({ markup, status }) =>
			{
				this.body = markup

				if (status)
				{
					this.status = status
				}
			}, 
			fail     : error => 
			{
				this.throw(error)
			}, 
			redirect : to => this.redirect(to),
			disable_server_side_rendering : disable_server_side_rendering,
			log,
			create_store,
			routes,
			markup_wrapper,
			head,
			body,
			styles
		})
	}

	web.use(rendering)

	// start http server
	web.listen(port, host, function(error)
	{
		if (error)
		{
			return log.error(error)
		}

		log.info(`Webpage server is listening at http://${host ? host : 'localhost'}:${port}`)
	})
}