import React from 'react'

import { Router, Route, IndexRoute } from 'react-router'

import Layout           from './pages/layout'
import Not_found        from './pages/not found'
import Users            from './pages/users'
import Home             from './pages/home'

export default function() // ({ dispatch, getState })
{
	const routes =
	(
		<Route path="/" component={Layout}>
			<IndexRoute component={Home}/>
			<Route path="users" component={Users}/>
			<Route path="*" component={Not_found}/>
		</Route>
	)

	return routes
}