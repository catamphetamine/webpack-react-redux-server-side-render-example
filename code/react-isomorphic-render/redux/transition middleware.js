import { ROUTER_DID_CHANGE } from 'redux-router/lib/constants'

// returns a promise which resolves when all the required preload()s are resolved
const get_data_dependencies = (components, getState, dispatch, location, params, options = {}) =>
{
	const method_name = options.deferred ? 'preload_deferred' : 'preload'

	return components
		.filter(component => component[method_name]) // only look at ones with a static preload()
		.map(component => component[method_name])    // pull out fetch data methods
		.map(preload => preload(getState, dispatch, location, params))  // call fetch data methods and save promises
}

const locations_are_equal = (a, b) => (a.pathname === b.pathname) && (a.search === b.search)

export default ({ getState, dispatch }) => next => action =>
{
	// on navigation
	if (action.type !== ROUTER_DID_CHANGE)
	{
		// proceed
		return next(action)
	}

	// do nothing if it's taking place on the client and the location hasn't changed
	if (getState().router && locations_are_equal(action.payload.location, getState().router.location))
	{
		return next(action)
	}

	const { components, location, params } = action.payload

	const promise = new Promise(resolve =>
	{
		// preload all the required data
		Promise.all(get_data_dependencies(components, getState, dispatch, location, params))
		// check for errors
		.catch(error => console.error(error.stack || error))
		// then
		.then(() =>
		{
			// proceed
			next(action)
			// preload all the deferred required data (if any)
			Promise.all(get_data_dependencies(components, getState, dispatch, location, params, { deferred: true }))
			// check for errors
			.catch(error => console.error(error.stack || error))
			// done
			.then(resolve)
		})
	})

	if (_server_)
	{
		// router state is null until ReduxRouter is created (on the client) 
		// so we can use router state variable to store the promise 
		// to let the server know when it can render
		getState().router = promise
	}

	// preload() then proceed
	//
	// returning promise from a middleware is not required.
	// can be used like: store.dispatch({ ... }).then(...)
	return promise
}