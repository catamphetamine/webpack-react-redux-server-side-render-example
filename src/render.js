import { render } from 'react-pages'

import settings from './react-pages'

export default async function()
{
  // Renders the webpage on the client side
  const { store, rerender } = await render(settings)

  // Webpack "Hot Module Replacement"
  if (module.hot) {
    module.hot.accept('./react-pages', () => {
      store.hotReload(settings.reducers)
      rerender()
    })
  }
}