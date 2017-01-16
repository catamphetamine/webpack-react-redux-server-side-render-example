import React from 'react'
import { Route, IndexRoute } from 'react-router'

import Layout    from './pages/Layout'
import Not_found from './pages/Not found'
import Users     from './pages/Users'
import Home      from './pages/Home'

const routes =
(
	<Route path="/" component={ Layout }>
		<IndexRoute component={ Home }/>
		<Route path="users" component={ Users }/>
		<Route path="*" component={ Not_found } status={ 404 }/>
	</Route>
)

export default routes