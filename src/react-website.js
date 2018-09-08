import routes  from './routes'
import * as reducers from './redux'
import container from './Container'

// "Favicon" must be imported on the client side too
// since no assets are emitted on the server side
export { default as icon } from '../assets/images/icon.png'

export default
{
	reducers,
	routes,
	container,

	// Enable "code splitting" mode.
	// See `README-CODE-SPLITTING` for more info.
	// https://github.com/catamphetamine/react-website/blob/master/README-CODE-SPLITTING.md
	codeSplit: true,

	// When using `codeSplit` with `getComponent`
	// `<Route/>` components are loaded after the initial page render.
	// To hide webpage content until all `<Route/>` components
	// are resolved one may set `showPreloadInitially` to `true`
	// and use the exported `<Loading/>` component on the website.
	//
	// When not using the `codeSplit` feature:
	// When the website is open in a web browser
	// hide website content under a "preloading" screen
	// until the application has finished loading.
	// It still "blinks" a bit in development mode
	// because CSS styles in development mode are included
	// not as `*.css` files but dynamically via javascript
	// by adding a `<style/>` DOM element, and that's why
	// in development mode styles are not applied immediately
	// in a web browser. In production mode CSS styles are
	// included as `*.css` files so they are applied immediately.
	//
	showPreloadInitially: true,

	onError(error, { path, url, redirect, dispatch, getState, server })
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
	},

	// Would use this setting for a real-world cloud-based API
	// (e.g. AWS Lambda) but just for demo purposes on `localhost`
	// Chrome won't allow querying `localhost` from `localhost`
	// so had to just proxy the `/api` path on the "proxy server".
	//
	// The Chrome error is:
	//
	// "Failed to load http://localhost:3003/example/users:
	//  Response to preflight request doesn't pass access control check:
	//  No 'Access-Control-Allow-Origin' header is present on the requested resource.
	//  Origin 'http://localhost:3000' is therefore not allowed access."
	//
	// http: {
	// 	transformURL: (path) => {
	// 		if (path.indexOf('/api/') === 0) {
	// 			return configuration.api + path.slice('/api'.length)
	// 		}
	// 		return path
	// 	}
	// }
}