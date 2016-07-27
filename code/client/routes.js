import React from 'react'

import { Router, Route, IndexRoute } from 'react-router'

import Layout           from './pages/layout'
//import Not_found        from './pages/not found'
//import Users            from './pages/users'
//import Home             from './pages/home'

export default function() // ({ store })
{
	// Asynchronous routes
	const routes =
	{
		path: '/',
		component: Layout,

		getChildRoutes(partialNextState, callback)
		{
			require.ensure([], (require) =>
			{
				callback(null,
				[
					require('./routes/users'),
					require('./routes/not found')
				])
			})
		},

		getIndexRoute(partialNextState, callback)
		{
			require.ensure([], (require) =>
			{
				callback(null, <Route component={require('./pages/home')}/>)
			})
        }
	}

	/*
	const routes =
	(
		<Route path="/" component={Layout}>
			<IndexRoute component={Home}/>
			<Route path="users" component={Users}/>
			<Route path="*" component={Not_found}/>
		</Route>
	)
	*/

	return routes
}