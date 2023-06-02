import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'

export default function RootComponent({ store, children }) {
	return (
		<Provider store={store}>
			{children}
		</Provider>
	)
}

RootComponent.propTypes = {
	store: PropTypes.object.isRequired
}