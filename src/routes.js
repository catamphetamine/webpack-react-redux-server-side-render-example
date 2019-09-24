import React from 'react'
import { Route } from 'react-pages'

import Application from './pages/Application'

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
			getComponent={() => import('./pages/Users').then(_ => _.default)}
			load={require('./pages/Users.load').default}
			meta={require('./pages/Users.meta').default}/>

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