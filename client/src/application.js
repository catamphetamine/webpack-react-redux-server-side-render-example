import { render } from 'react-isomorphic-render'

import settings from './react-isomorphic-render'

require('react-responsive-ui/style.css')
require('../assets/styles/style.scss')

async function run()
{
	// Renders the webpage on the client side
	const { store, rerender } = await render(settings)

	// Webpack "Hot Module Replacement"
	if (module.hot)
	{
		module.hot.accept('./react-isomorphic-render', () =>
		{
			store.hotReload(settings.reducer)
			rerender()
		})
	}
}

// Run the application
run().catch((error) => console.error(error))