// produces wrong line numbers:
// import 'source-map-support/register'

import React from 'react'

import Html           from './html'

import { server }     from '../redux'

// isomorphic (universal) rendering (middleware).
// will be used in web_application.use(...)
export default function render({ request, respond, fail, redirect, disable_server_side_rendering, log, create_store, routes, markup_wrapper, head, body, styles })
{
	if (_development_)
	{
		// force refresh webpack stats to get new "hash" value
		// on the next require(webpack-assets.json) call
		delete require.cache[_webpack_assets_path_]
	}

	const store = create_store(undefined, request)

	return server
	({
		disable_server_side_rendering : disable_server_side_rendering,
		wrap_component: component =>
		{
			return markup_wrapper(component, { store })
		},
		url: request.originalUrl.replace(/\?$/, ''),
		html:
		{
			with_rendering: component => <Html head={head} body={body} styles={styles} store={store} component={component}/>,
			without_rendering:     () => <Html head={head} body={body} styles={styles} store={store}/>
		},
		store: store
	})
	.then(({ status, markup, redirect_to }) =>
	{
		if (redirect_to)
		{
			return redirect(redirect_to)
		}

		respond({ status, markup })
	},
	error =>
	{
		log.error(error)

		if (error.markup)
		{
			respond({ markup: error.markup, status: 500 })
		}
		else
		{
			fail(error)
		}
	})
}