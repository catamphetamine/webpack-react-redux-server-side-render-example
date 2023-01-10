import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'

export default function Container({ store, children }) {
	return (
		<Provider store={store}>
			{children}
		</Provider>
	)
}

Container.propTypes = {
	store: PropTypes.object.isRequired
}