import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'

export default class Container extends Component
{
  static propTypes =
  {
    store: PropTypes.object.isRequired
  }

  render()
  {
    const { store, children } = this.props

    // https://github.com/gaearon/react-hot-loader/blob/master/docs/Troubleshooting.md#react-hot-loader-this-component-is-not-accepted-by-hot-loader
    return (
      <AppContainer warnings={ false }>
        <Provider store={ store }>
          { children }
        </Provider>
      </AppContainer>
    )
  }
}