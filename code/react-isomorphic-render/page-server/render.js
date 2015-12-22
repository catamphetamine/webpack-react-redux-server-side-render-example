// produces wrong line numbers:
// import 'source-map-support/register'

import React from 'react'

import fs from 'fs'

import Html           from './html'

import { server as render }     from '../redux/render'

let assets

// isomorphic (universal) rendering (middleware).
// will be used in web_application.use(...)
export default function({ development, development_tools, webpack_assets_path, request, respond, fail, redirect, disable_server_side_rendering, log, create_store, markup_wrapper, head, body, styles })
{
	// // force refresh webpack stats to get new "hash" value
	// // on the next require(webpack-assets.json) call
	// if (development)
	// {
	// 	delete require.cache[webpack_assets_path]
	// }

	// // require() cache will be flushed for Webpack stats
	// // on every webpage refresh when in development mode
	// //
	// require(_webpack_assets_path_)

	// require() isn't used here to prevent Webpack 
	// from including everything in the bundle during build process
	//
	if (development || !assets)
	{
		assets = JSON.parse(fs.readFileSync(_webpack_assets_path_))
	}

	// create Redux store
	const store = create_store(undefined, { http_request: request, development, development_tools, server: true })

	// render the web page
	return render
	({
		disable_server_side_rendering : disable_server_side_rendering,
		url: request.originalUrl.replace(/\?$/, ''),
		wrap_component: component =>
		{
			return markup_wrapper(component, { store })
		},
		html:
		{
			with_rendering: component => <Html development={development} assets={assets} head={head} body={body} styles={styles} store={store} component={component}/>,
			without_rendering:     () => <Html development={development} assets={assets} head={head} body={body} styles={styles} store={store}/>
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