import { render } from 'react-pages/client'

import settings from './react-pages.js'

export default async function() {
  // Renders the webpage on the client side
  const { enableHotReload } = await render(settings)

	// Enables hot-reload via Webpack "Hot Module Replacement".
	if (import.meta.webpackHot) {
		enableHotReload()
	}
}