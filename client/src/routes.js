import React from 'react'
import { Route, IndexRoute } from 'react-router'

import Application     from './pages/Application'

import Users           from './pages/Users'
import Home            from './pages/Home'

import GenericError    from './pages/errors/Error'
import Unauthenticated from './pages/errors/Unauthenticated'
import Unauthorized    from './pages/errors/Unauthorized'
import NotFound        from './pages/errors/NotFound'

export default
(
	<Route
		path="/"
		component={ Application }>

		<IndexRoute
			component={ Home }/>

		<Route
			path="users"
			component={ Users }/>

		<Route
			path="unauthenticated"
			component={ Unauthenticated }
			status={ 401 }/>

		<Route
			path="unauthorized"
			component={ Unauthorized }
			status={ 403 }/>

		<Route
			path="not-found"
			component={ NotFound }
			status={ 404 }/>

		<Route
			path="error"
			component={ GenericError }
			status={ 500 }/>

		<Route
			path="*"
			component={ NotFound }
			status={ 404 }/>
	</Route>
)