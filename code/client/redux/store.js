import { create_store } from 'react-isomorphic-render/redux'

export default function(options)
{
	const { store, reload } = create_store(() => require('../model'), options)

	// (for Webpack users only)
	//
	// client side hot module reload for Redux reducers
	// http://webpack.github.io/docs/hot-module-replacement.html#accept
	if (_development_ && module.hot)
	{
		// this path must be equal to the path in the `require()` call in `create_store` above
		module.hot.accept('../model', reload)
	}

	return store
}