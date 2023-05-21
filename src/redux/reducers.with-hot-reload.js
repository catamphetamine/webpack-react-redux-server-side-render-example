import { updateReducers } from 'react-pages'

import * as reducers from './reducers.js'

export * from './reducers.js'

// Enables hot-reload via Webpack "Hot Module Replacement".
if (import.meta.webpackHot) {
	import.meta.webpackHot.accept(['./reducers.js'], () => {
		updateReducers(reducers)
	})
}