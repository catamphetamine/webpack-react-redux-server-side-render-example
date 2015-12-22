import { createStore, combineReducers, applyMiddleware, compose } from 'redux'

import asynchronous_middleware from './asynchronous middleware'
import transition_middleware from './transition middleware'

import dev_tools from './dev tools'

import http_client from '../http client'

import { routerStateReducer } from 'redux-router'

import { createRoutes } from 'react-router/lib/RouteUtils'

import { reduxReactRouter as reduxReactRouter_client } from 'redux-router'
import { reduxReactRouter as reduxReactRouter_server } from 'redux-router/server'

import createHistory_server from 'history/lib/createMemoryHistory'
import createHistory_client from 'history/lib/createBrowserHistory'

// Three different types of scroll behavior available.
// Documented at https://github.com/rackt/scroll-behavior
//
// Possibly currently doesn't make any difference
import use_scroll from 'scroll-behavior/lib/useStandardScroll'

// Wrap the hooks so they don't fire if they're called before
// the store is initialised. This only happens when doing the first
// client render of a route that has an onEnter hook
function makeHooksSafe(routes, store)
{
	if (Array.isArray(routes))
	{
		return routes.map((route) => makeHooksSafe(route, store))
	}

	const onEnter = routes.onEnter

	if (onEnter)
	{
		routes.onEnter = function safeOnEnter(...args)
		{
			try
			{
				store.getState()
			}
			catch (err)
			{
				if (onEnter.length === 3)
				{
					args[2]()
				}

				// There's no store yet so ignore the hook
				return
			}

			onEnter.apply(null, args)
		}
	}

	if (routes.childRoutes)
	{
		makeHooksSafe(routes.childRoutes, store)
	}

	if (routes.indexRoute)
	{
		makeHooksSafe(routes.indexRoute, store)
	}

	return routes
}

function makeRouteHooksSafe(create_routes)
{
	return store => makeHooksSafe(createRoutes(create_routes(store)), store)
}

export default function({ development, development_tools, server, get_reducers, data, create_routes, http_request, host, port }) 
{
	create_routes          = server ? create_routes : makeRouteHooksSafe(create_routes)
	const reduxReactRouter = server ? reduxReactRouter_server : reduxReactRouter_client
	const createHistory    = server ? createHistory_server : use_scroll(createHistory_client)

	const middleware = [asynchronous_middleware(new http_client({ host, port, clone_request: http_request })), transition_middleware(server)]
	
	let create_store

	if (development && !server && development_tools)
	{
		const { persistState } = require('redux-devtools')

		create_store = compose
		(
			applyMiddleware(...middleware),
			// Provides support for DevTools:
			dev_tools.instrument(),
			// Lets you write ?debug_session=<name> in address bar to persist debug sessions
			persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
		)
		(createStore)
	} 
	else
	{
		create_store = applyMiddleware(...middleware)(createStore)
	}

	// keeps react-router state in Redux
	create_store = reduxReactRouter({ getRoutes: create_routes, createHistory })(create_store)

	// adds redux-router reducers to the list of all reducers
	const overall_reducer = () =>
	{
		const model = get_reducers()
		model.router = routerStateReducer
		return combineReducers(model)
	}

	const store = create_store(overall_reducer(), data)
	
	// // client side hot module reload for Redux reducers attempt
	// // (won't work because it's not a parent module for the reducers)
	// // https://github.com/webpack/webpack/issues/1790
	// if (development && module.hot)
	// {
	// 	module.hot.accept(reducers_path, () =>
	// 	{
	// 		store.replaceReducer(overall_reducer())
	// 	})
	// }

	return { store, reload: () => store.replaceReducer(overall_reducer()) }
}
