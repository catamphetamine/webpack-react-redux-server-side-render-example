import * as reducers from './reducers.js'

export * from './reducers.js'

// Webpack "Hot Module Replacement"
if (import.meta.webpackHot) {
	// Update Redux "reducers" and actions.
	import.meta.webpackHot.accept(['./reducers.js'], () => {
		if (window.hotReloadRedux) {
			window.hotReloadRedux({ reducers })
		} else {
			window.hotReloadReduxOnLoad = { reducers }
		}
	})
}