import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'

export default class Wrapper extends Component
{
  static propTypes =
  {
    store: React.PropTypes.object.isRequired
  }

  render()
  {
    const { store, children } = this.props

    return (
      <AppContainer>
        <Provider store={ store }>
          { children }
        </Provider>
      </AppContainer>
    )
  }
}