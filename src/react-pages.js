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
	// https://github.com/catamphetamine/react-pages/blob/master/README-CODE-SPLITTING.md
	codeSplit: true,


	// When using `codeSplit` with `getComponent`,
	// route components are loaded after the initial page render.
	// To hide webpage content until all route components
	// are resolved one may set `showLoadingInitially` to `true`
	// and use the exported `<Loading/>` component on the website.
	//
	// When not using the `codeSplit` feature:
	//
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
	showLoadingInitially: true,

	// Default `<meta/>`.
	meta: {
		site_name   : 'WebApp',
		title       : 'WebApp',
		description : 'A generic web application boilerplate',
		image       : 'https://www.google.ru/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
		locale      : 'en_US',
		locales     : ['ru_RU', 'en_US']
	},

	onError,

	http: {
		transformUrl: (url, { server }) => {
			// Pass all `api://` requests to the API server.
			if (url.indexOf('api://') === 0) {
				//
				// Chrome won't allow querying `localhost` from `localhost`
				// so had to just proxy the `/api` path using `webpack-dev-server`.
				//
				// The Chrome error was:
				//
				// "Failed to load http://localhost:3003/example/users:
				//  Response to preflight request doesn't pass access control check:
				//  No 'Access-Control-Allow-Origin' header is present on the requested resource.
				//  Origin 'http://localhost:3000' is therefore not allowed access."
				//
				// https://stackoverflow.com/a/10892392/970769
				//
				if (!server && window.location.hostname === 'localhost') {
					return '/api/' + url.slice('api://'.length)
				}
				// Transform to an absolute URL.
				return configuration.api + '/' + url.slice('api://'.length)
			}
			return url
		}
	}
}

export function onError(error, { path, url, redirect, dispatch, getState, server }) {
	console.error(`Error while preloading "${url}"`)
	console.error(error)
	const redirectToErrorPage = (errorPagePath) => {
		// Prevents infinite redirection loop or double redirection.
		// For example, a double redirection in case of `/unauthenticated`.
		// (e.g. when two parallel `Promise`s load inside `@preload()`
		//  and both get Status 401 HTTP Response).
		// Or, for example, an infinite redirection loop in case of `/error`
		// when there're overall page rendering bugs, etc.
		if (path !== errorPagePath) {
			redirect(`${errorPagePath}?url=${encodeURIComponent(url)}`)
		}
	}
	// Not authenticated.
	if (error.status === 401) {
		return redirectToErrorPage('/unauthenticated')
	}
	// Not authorized.
	if (error.status === 403) {
		return redirectToErrorPage('/unauthorized')
	}
	// Not authorized.
	if (error.status === 404) {
		return redirectToErrorPage('/not-found')
	}
	// Redirect to a generic error page.
	return redirectToErrorPage('/error')
}