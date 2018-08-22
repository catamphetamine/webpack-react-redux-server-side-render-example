import React from 'react'
import { Route } from 'react-website'

import Application from './pages/Application'

import Users from './pages/Users'
import Home from './pages/Home'

import GenericError from './pages/Error'
import Unauthenticated from './pages/Unauthenticated'
import Unauthorized from './pages/Unauthorized'
import NotFound from './pages/NotFound'

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