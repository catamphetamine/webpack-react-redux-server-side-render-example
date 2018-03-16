import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader'

function Container({ store, children })
{
	return (
		<Provider store={ store }>
			{ children }
		</Provider>
	)
}

Container.propTypes =
{
	store: PropTypes.object.isRequired
}

export default hot(module)(Container)