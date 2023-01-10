import React from 'react'
import { Route } from 'react-pages'

import Application from './pages/Application.js'

import Users from './pages/Users.js'
import Home from './pages/Home.js'

import GenericError from './pages/Error.js'
import Unauthenticated from './pages/Unauthenticated.js'
import Unauthorized from './pages/Unauthorized.js'
import NotFound from './pages/NotFound.js'

export default
(
	<Route
		path="/"
		Component={Application}>

		<Route
			Component={Home}/>

		<Route
			path="users"
			Component={Users}/>

		<Route
			path="unauthenticated"
			Component={Unauthenticated}
			status={401}/>

		<Route
			path="unauthorized"
			Component={Unauthorized}
			status={403}/>

		<Route
			path="not-found"
			Component={NotFound}
			status={404}/>

		<Route
			path="error"
			Component={GenericError}
			status={500}/>

		<Route
			path="*"
			Component={NotFound}
			status={404}/>
	</Route>
)