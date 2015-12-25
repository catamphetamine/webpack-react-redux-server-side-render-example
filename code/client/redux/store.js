import { create_store } from 'react-isomorphic-render/redux'

// creates React-router routes
import create_routes from '../routes'

export default function(options)
{
	// get Redux reducers
	const get_reducers = () => require('../model')

	const { store, reload } = create_store(get_reducers, create_routes, options)

	// client side hot module reload for Redux reducers
	// http://webpack.github.io/docs/hot-module-replacement.html#accept
	if (_development_ && module.hot)
	{
		// this path must be equal to the path in `get_reducers` function above
		module.hot.accept('../model', reload)
	}

	return store
}