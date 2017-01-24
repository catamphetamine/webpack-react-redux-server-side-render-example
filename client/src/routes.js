import React from 'react'
import { Route, IndexRoute } from 'react-router'

import Layout    from './pages/Layout'
import NotFound from './pages/NotFound'
import Users     from './pages/Users'
import Home      from './pages/Home'

const routes =
(
	<Route path="/" component={ Layout }>
		<IndexRoute component={ Home }/>
		<Route path="users" component={ Users }/>
		<Route path="*" component={ NotFound } status={ 404 }/>
	</Route>
)

export default routes