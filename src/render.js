import { render } from 'react-website'

import settings from './react-website'

export default async function()
{
  // Renders the webpage on the client side
  const { store, rerender } = await render(settings)

  // Webpack "Hot Module Replacement"
  if (module.hot)
  {
    module.hot.accept('./react-website', () =>
    {
      store.hotReload(settings.reducer)
      rerender()
    })
  }
}