import React from 'react'

import Application from './pages/Application.js'

import Users from './pages/Users.js'
import Home from './pages/Home.js'

import GenericError from './pages/Error.js'
import Unauthenticated from './pages/Unauthenticated.js'
import Unauthorized from './pages/Unauthorized.js'
import NotFound from './pages/NotFound.js'

export default [{
	path: '/',
	Component: Application,
	children: [
		{ Component: Home },
		{ Component: Users, path: 'users' },
		{ Component: Unauthenticated, path: 'unauthenticated', status: 401 },
		{ Component: Unauthenticated, path: 'unauthenticated', status: 401 },
		{ Component: Unauthorized, path: 'unauthorized', status: 403 },
		{ Component: NotFound, path: 'not-found', status: 404 },
		{ Component: GenericError, path: 'error', status: 500 },
		{ Component: NotFound, path: '*', status: 404 }
	]
}]