import { render } from 'react-isomorphic-render'

import settings from './react-isomorphic-render'

require('react-responsive-ui/style.css')
require('../assets/styles/style.scss')

// renders the webpage on the client side
render(settings).then(({ store, rerender }) =>
{
  if (module.hot)
  {
    module.hot.accept('./react-isomorphic-render', () =>
    {
      store.hotReload(settings.reducer)
      rerender()
    })
  }
})
.catch((error) => console.error(error))