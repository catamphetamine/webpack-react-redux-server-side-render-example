import routes  from './routes'
import * as reducer from './redux/reducer'
import wrapper from './wrapper'
import asyncSettings from './react-isomorphic-render-async'

// "Favicon" must be imported on the client side too
// since no assets are emitted on the server side
export { default as icon } from '../assets/images/icon.png'

export default
{
	reducer,
	routes,
	wrapper,

	error(error, { path, url, redirect, dispatch, getState, server })
	{
		console.error(`Error while preloading "${url}"`)
		console.error(error)
		
		// // Not authenticated
		// if (error.status === 401)
		// {
		// 	return redirect('/unauthenticated')
		// }

		// // Not authorized
		// if (error.status === 403)
		// {
		// 	return redirect('/unauthorized')
		// }

		// Redirect to a generic error page in production
		if (process.env.NODE_ENV === 'production')
		{
			// Prevents infinite redirect to the error page
			// in case of overall page rendering bugs, etc.
			if (path !== '/error')
			{
				// Redirect to a generic error page
				return redirect(add_redirect('/error', url))
			}
		}
	},

	...asyncSettings
}