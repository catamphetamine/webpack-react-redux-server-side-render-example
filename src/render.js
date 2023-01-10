import { render } from 'react-pages/client'

import settings from './react-pages.js'

export default async function()
{
  // Renders the webpage on the client side
  const { store } = await render(settings)

	// Webpack "Hot Module Replacement"
	if (import.meta.webpackHot) {
		// Updates Redux "reducers" and actions.
		window.hotReloadRedux = ({ reducers }) => {
			store.hotReload(reducers)
		}
		// If if a hot reload has been requested before the page finished rendering.
		if (window.hotReloadReduxOnLoad) {
			window.hotReloadRedux(window.hotReloadReduxOnLoad)
		}
	}
}