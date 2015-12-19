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

function makeRouteHooksSafe(_getRoutes)
{
	return store => makeHooksSafe(createRoutes(_getRoutes(store)), store)
}

export default function({ get_reducers, reducers_path, data, routes, http_request, host, port }) 
{
	const getRoutes = _server_ ? routes : makeRouteHooksSafe(routes)
	const reduxReactRouter = _server_ ? reduxReactRouter_server : reduxReactRouter_client
	const createHistory = _server_ ? createHistory_server : use_scroll(createHistory_client)

	const middleware = [asynchronous_middleware(new http_client({ host, port, clone_request: http_request })), transition_middleware]
	
	let create_store

	if (_development_ && _client_ && _development_tools_)
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
	create_store = reduxReactRouter({ getRoutes, createHistory })(create_store)

	const overall_reducer = () =>
	{
		// can't simply "require(reducers_path)" 
		// because Webpack needs a constant string path.
		// https://github.com/webpack/docs/wiki/context
		const model = get_reducers()
		model.router = routerStateReducer
		return combineReducers(model)
	}

	const store = create_store(overall_reducer(), data)
	
	if (_development_ && module.hot)
	{
		module.hot.accept(reducers_path, () =>
		{
			// check if this works (maybe place require(...) here otherwise)
			store.replaceReducer(overall_reducer())
		})
	}

	return store
}
