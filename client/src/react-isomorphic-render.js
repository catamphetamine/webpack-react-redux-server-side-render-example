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

	catch(error, { path, url, redirect, dispatch, getState, server })
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

		// Redirect to a generic error page
		if (process.env.NODE_ENV === 'production')
		{
			redirect('/error')
		}

		throw error
	},

	...asyncSettings
}