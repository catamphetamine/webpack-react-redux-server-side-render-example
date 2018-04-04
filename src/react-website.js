import routes  from './routes'
import * as reducer from './redux'
import container from './Container'

// "Favicon" must be imported on the client side too
// since no assets are emitted on the server side
export { default as icon } from '../assets/images/icon.png'

export default
{
	reducer,
	routes,
	container,

	error(error, { path, url, redirect, dispatch, getState, server })
	{
		console.error(`Error while preloading "${url}"`)
		console.error(error)

		// Not authenticated
		if (error.status === 401)
		{
			// Prevent double redirection to `/unauthenticated`.
			// (e.g. when two parallel `Promise`s load inside `@preload()`
			//  and both get Status 401 HTTP Response)
			if (typeof window !== 'undefined' && window.location.pathname === '/unauthenticated')
			{
				return
			}

			return redirect('/unauthenticated')
		}

		// Not authorized
		if (error.status === 403)
		{
			return redirect('/unauthorized')
		}

		// Redirect to a generic error page in production
		if (process.env.NODE_ENV === 'production')
		{
			// Prevents infinite redirect to the error page
			// in case of overall page rendering bugs, etc.
			if (path !== '/error')
			{
				// Redirect to a generic error page
				return redirect(`/error?url=${encodeURIComponent(url)}`)
			}
		}
	}
}