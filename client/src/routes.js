import React from 'react'
import { Route, IndexRoute } from 'react-router'

import Layout       from './pages/Layout'
import GenericError from './pages/Error'
import NotFound     from './pages/NotFound'
import Users        from './pages/Users'
import Home         from './pages/Home'

export default
(
	<Route path="/" component={ Layout }>
		<IndexRoute component={ Home }/>
		<Route path="users" component={ Users }/>
		<Route path="error" component={ GenericError }/>
		<Route path="*" component={ NotFound } status={ 404 }/>
	</Route>
)