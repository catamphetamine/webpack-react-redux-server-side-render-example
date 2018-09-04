import React from 'react'
import { Route } from 'react-website'

import Application from './pages/Application'
import getApplicationMeta from './pages/Application.meta'
import Home from './pages/Home'

import GenericError from './pages/Error'
import Unauthenticated from './pages/Unauthenticated'
import Unauthorized from './pages/Unauthorized'
import NotFound from './pages/NotFound'

export default
(
	<Route
		path="/"
		Component={Application}
		meta={getApplicationMeta}>

		<Route
			Component={Home}
			meta={state => ({ title: 'Home' })}/>

		<Route
			path="users"
			getComponent={() => import('./pages/Users').then(_ => _.default)}
			preload={require('./pages/Users.data').default}
			meta={require('./pages/Users.meta').default}/>

		<Route
			path="unauthenticated"
			Component={Unauthenticated}
			meta={state => ({ title: 'Unauthenticated' })}
			status={401}/>

		<Route
			path="unauthorized"
			Component={Unauthorized}
			meta={state => ({ title: 'Unauthorized' })}
			status={403}/>

		<Route
			path="not-found"
			Component={NotFound}
			meta={state => ({ title: 'Not Found' })}
			status={404}/>

		<Route
			path="error"
			Component={GenericError}
			meta={state => ({ title: 'Error' })}
			status={500}/>

		<Route
			path="*"
			Component={NotFound}
			status={404}/>
	</Route>
)